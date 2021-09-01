import { Router } from 'express';
import * as usersController from '../controllers/users.controller'
const router = Router()


router.get('/', usersController.findAllUsers)
router.get('/:id', usersController.findOneUser)
router.post('/', usersController.createUser)
router.put('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)



export default router;

