import { Router } from 'express';
import * as usersController from '../controllers/users.controller'
import { authJwt } from '../middlewares';
import { verifySignup } from '../middlewares' 
const router = Router()


router.get('/', usersController.findAllUsers)

router.get('/admins', usersController.findAllAdmins)
router.get('/doctors', usersController.findAllDoctors)
router.get('/patients', usersController.findAllPatients)

router.get('/:id', usersController.findOneUser)

router.post('/', [
    authJwt.verifyToken, 
    authJwt.verifyAdmin, 
    verifySignup.checkRolesExisted,
    verifySignup.checkDuplicateEmail
], usersController.createUser)
router.put('/:id', [authJwt.verifyToken], usersController.updateUser)
router.delete('/:id', [authJwt.verifyToken], usersController.deleteUser)




export default router;

