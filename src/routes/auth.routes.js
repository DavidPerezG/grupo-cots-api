import * as authController from '../controllers/auth.controller';
import { Router } from 'express';
import { verifySignup } from '../middlewares';
const router =  Router();

router.post('/signin', authController.signIn)
router.post('/signinpatient', authController.signInPatient)
router.post('/signup', [
    verifySignup.checkDuplicateEmailOfUser, 
    verifySignup.checkRolesExisted
], authController.signUp)
router.put('/changepassword/:id', authController.changePassword)


export default router;