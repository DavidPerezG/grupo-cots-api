import { Router } from 'express';
import * as secreteriesController from '../controllers/secretaries.controller'
const router = Router();

router.get('/', secreteriesController.findAllSecretaries)
router.get('/:id', secreteriesController.findOneSecretary)
router.post('/', secreteriesController.createSecretary)
router.put('/:id', secreteriesController.updateSecretary)
router.delete('/:id', secreteriesController.deleteSecretary)

export default router;