import { Router } from 'express';
import * as doctorsController from '../controllers/doctors.controller'
const router = Router();

router.get('/', doctorsController.findAllDoctors)
router.get('/:id', doctorsController.findOneDoctor)
router.post('/', doctorsController.createDoctor)
router.put('/:id', doctorsController.updateDoctor)
router.delete('/:id', doctorsController.deleteDoctor)

export default router;

