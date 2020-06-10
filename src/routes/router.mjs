import express from 'express';
import GradesController from '../controller/gradesController.mjs';
const router = express.Router();

const gradesController = new GradesController;

router.post('/grades', gradesController.store);
router.put('/grades', gradesController.update);
router.delete('/grades/:id', gradesController.delete);
router.get('/grades/:id', gradesController.show);
router.get('/indexByStdAndSub', gradesController.indexByStdAndSub);
router.get('/averageBySubAndType', gradesController.averageBySubAndType);
router.get('/bestBySubAndType', gradesController.bestBySubAndType);

export default router;
