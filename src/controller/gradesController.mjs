import path from 'path';
import fs from 'fs';
import yup from 'yup';

let readFile = fs.promises.readFile;
let writeFile = fs.promises.writeFile;

readFile

class GradesController {
  async store(req, res) {
    try {
      let grades = await readFile(path.join(process.cwd(), 'json/grades.json'), "utf8");
      let gradesJSON = JSON.parse(grades);

      let { student, subject, type, value } = req.body;
      let idNew = gradesJSON.nextId++;
      let timestamp = new Date();

      let schema = yup.object().shape({
        student: yup.string(),
        subject: yup.string(),
        type: yup.string(),
        value: yup.number(),
      });

      let valido = await schema.isValid({
        student,
        subject,
        type,
        value,
      }, {
        stripUnknown: true,
      });

      let mountNewGrade = {
        id: idNew,
        student,
        subject,
        type,
        value,
        timestamp
      };

      if (valido) {
        let NewId = { nextId: ++idNew };
        gradesJSON.grades.push(mountNewGrade);
        let newGrades = { ...gradesJSON, ...NewId };

        await writeFile(path.join(process.cwd(), 'json/grades.json'), JSON.stringify(newGrades), { flag: "w", codification: "utf8" }).catch(err => { console.log(err) });
        res.send(mountNewGrade);
      } else {
        console.log('Erro para inserir os dados.');
      };

    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    let { id } = req.body;
    try {
      let grades = await readFile(path.join(process.cwd(), 'json/grades.json'), "utf8");
      let gradesJSON = JSON.parse(grades);
      let indexObj = gradesJSON.grades.findIndex((item => item.id === parseInt(id)));
      if (indexObj == -1) {
        res.send('Este id não existe!');
      } else {

        let { student, subject, type, value } = req.body;

        let schema = yup.object().shape({
          student: yup.string(),
          subject: yup.string(),
          type: yup.string(),
          value: yup.number(),
        });

        let valido = await schema.isValid({
          student,
          subject,
          type,
          value,
        }, {
          stripUnknown: true,
        });

        gradesJSON.grades[indexObj].student = student;
        gradesJSON.grades[indexObj].subject = subject;
        gradesJSON.grades[indexObj].type = type;
        gradesJSON.grades[indexObj].value = value;

        if (valido) {
          await writeFile(path.join(process.cwd(), 'json/grades.json'), JSON.stringify(gradesJSON), { flag: "w", codification: "utf8" }).catch(err => { console.log(err) });
          res.send(gradesJSON.grades[indexObj]);
        } else {
          console.log('Erro para atualizar os dados.');
        }

      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    try {
      let { id } = req.params;
      let grades = await readFile(path.join(process.cwd(), 'json/grades.json'), "utf8");
      let gradesJSON = JSON.parse(grades);
      let indexObj = gradesJSON.grades.findIndex((item => item.id === parseInt(id)));
      if (indexObj == -1) {
        res.send('Este id não existe!');
      } else {
        gradesJSON.grades = gradesJSON.grades.filter(item => item.id != id);
        await writeFile(path.join(process.cwd(), 'json/grades.json'), JSON.stringify(gradesJSON), { flag: "w", codification: "utf8" }).catch(err => { console.log(err) });
        res.send('deletado com sucesso!');
      }

    } catch (err) {
      console.log(err);
    }
  }

  async show(req, res) {
    try {
      let { id } = req.params;
      let grades = await readFile(path.join(process.cwd(), 'json/grades.json'), "utf8");
      let gradesJSON = JSON.parse(grades);

      let objGrade = gradesJSON.grades.find((item => item.id === parseInt(id)));

      if (objGrade === undefined) {
        res.send('Esta grade desejada não foi encontrada ou não existe')
      } else {
        res.send(objGrade);
      }

    } catch (err) {
      console.log(err);
    }
  }

  async indexByStdAndSub(req, res) {
    try {
      let { student, subject } = req.body;
      let grades = await readFile(path.join(process.cwd(), 'json/grades.json'), "utf8");
      let gradesJSON = JSON.parse(grades);

      let gradesNew = gradesJSON.grades.filter(item => item.student === student && item.subject === subject);
      if (gradesNew.length === 0) {
        res.send('Não foram encontrados notas para este estudante e/ou matéria.');
      } else {
        let total = gradesNew.reduce(((acc, val) => acc += val.value), 0);
        res.send(`O valor total de pontos da aluna(o) "${student}" na matéria "${subject}" foi de ${total} pontos.`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async averageBySubAndType(req, res) {
    try {
      let { subject, type } = req.body;

      let grades = await readFile(path.join(process.cwd(), 'json/grades.json'), "utf8");
      let gradesJSON = JSON.parse(grades);

      let gradesNew = gradesJSON.grades.filter(item => item.subject === subject && item.type === type);
      if (gradesNew.length === 0) {
        res.send('Não foram encontrados notas para este módulo e modalidade.');
      } else {
        let total = (gradesNew.reduce(((acc, val) => acc += val.value), 0)) / (gradesNew.length);
        res.send(`A média de notas para matéria "${subject}" na modalidade "${type}" é de ${total} pontos.`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async bestBySubAndType(req, res) {
    try {
      let { subject, type } = req.body;

      let grades = await readFile(path.join(process.cwd(), 'json/grades.json'), "utf8");
      let gradesJSON = JSON.parse(grades);

      let gradesNew = gradesJSON.grades.filter(item => item.subject === subject && item.type === type);
      if (gradesNew.length === 0) {
        res.send('Não foram encontrados notas para este módulo e modalidade.');
      } else {

        let melhores = gradesNew.sort((a, b) => {
          return b.value - a.value;
        }).slice(0, 3);

        res.send(melhores);

      }
    } catch (err) {
      console.log(err);
    }
  }

}

export default GradesController;
