import * as authController from '../controllers/auth.controller';
import { Router } from 'express';
import { verifySignup } from '../middlewares';
const router =  Router();

router.post('/signin',authController.signIn)
router.post('/signup', [
    verifySignup.checkDuplicateEmail, 
    verifySignup.checkRolesExisted
], authController.signUp)


export default router;