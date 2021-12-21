import { Router } from 'express';
import * as adminsController from '../controllers/admin.controller'
const router = Router();

router.get('/', adminsController.findAllAdmins)
router.get('/:id', adminsController.findOneAdmin)
router.post('/', adminsController.createAdmin)
router.put('/:id', adminsController.updateAdmin)
router.delete('/:id', adminsController.deleteAdmin)

export default router;