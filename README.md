

## GRADES API

Exercitar os conceitos trabalhados no módulo para criação de uma API, criando endpoints utilizando Node.js e Express.

**Enunciado**

Desenvolver uma API chamada “grades-control-api” para controlar notas de alunos em matérias de um curso.

**Atividades**

O desafio final consiste em desenvolver uma API chamada “grades-control-api” para controlar notas de alunos em matérias de um curso. Você deverá desenvolver endpoints para criação, atualização, exclusão e consulta de notas, aqui chamadas de grades. As grades deverão ser salvas em um arquivo json, chamado “grades.json”. Esse arquivo será previamente fornecido e seus endpoints devem atuar considerando os registros já existentes.

Uma grade deve possuir os campos abaixo:

- id (int): identificador único da grade. Deve ser gerado automaticamente pela API e garantir que não se repita.

- student (string): nome do aluno. Exemplo: “Guilherme Assis”.

- subject (string): nome da matéria. Exemplo: “Matemática”.

- type (string): nome da atividade. Exemplo: “Prova final”.

- value (float): nota da atividade. Exemplo: 10.

- timestamp (string): horário do lançamento. Exemplo: 2020-05-19T18:21:24.964Z. Dica: utilizar o “new Date()” do JavaScript.



Para startar:

```
npm install
```
Com este comando você irá inicializar o servidor:
```
npm run dev
```
Plataforma criada para o IGTI como exercício para aprendizado.

Rotas existentes:
```
STORE (METHOD POST)
http://localhost:3000/grades

req.body = {
	"student": "Roberto Achar",
	"subject": "03 - React",
	"type": "Fórum",
	"value": 10
}
```
```
PUT (METHOD PUT)
http://localhost:3000/grades

req.body = {
	"id": 33,
	"student": "Roberto Achar",
	"subject": "01 - JavaScript",
	"type": "Desafio",
	"value": 15
}
```
```
DELETE (METHOD DELETE)
http://localhost:3000/grades/:id
```
```
SHOW (METHOD GET)
http://localhost:3000/grades/:id
```
```
SHOW TOTAL VALUES BY STUDENT NAME AND SUBJECT (METHOD GET)
http://localhost:3000/indexByStdAndSub

req.body = {
	"student": "Roberto Achar",
	"subject": "03 - React"
}
```
```
SHOW AVARAGE OF VALUES (METHOD GET)
http://localhost:3000/averageBySubAndType

req.body = {
	"subject": "02 - Node",
	"type": "Desafio"
}
```
```
SHOW BEST 3 VALUES BY SUBJECT AND TYPE (METHOD GET)
http://localhost:3000/bestBySubAndType

req.body = {
	"subject": "03 - React",
	"type": "Trabalho Prático"
}
```

![https://i.ibb.co/6Y83fBR/image.png](https://i.ibb.co/6Y83fBR/image.png)
