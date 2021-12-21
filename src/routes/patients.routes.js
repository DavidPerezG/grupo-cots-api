import { Router } from 'express';
import * as patientController from '../controllers/patients.controller'
import { authJwt } from '../middlewares';
import { verifySignup } from '../middlewares' 
const router = Router()


router.get('/', patientController.findAllPatients)
router.get('/:id', patientController.findOnePatient)
router.post('/', patientController.createPatient)
router.put('/:id', patientController.updatePatient)
router.delete('/:id', patientController.deletePatient)


export default router;
