import { Router } from 'express';
import * as companyController from '../controllers/companies.controller';
import { verifySignup } from '../middlewares' 
import { authJwt } from '../middlewares';

const router = Router()

router.get('/', companyController.findAllCompanies)
router.get('/:id', companyController.findOneCompany)
router.post('/', [authJwt.verifyToken, verifySignup.checkDuplicateEmailOfCompany], companyController.createCompany)
router.put('/:id', [authJwt.verifyToken], companyController.updateCompany)
router.delete('/:id', [authJwt.verifyToken], companyController.deleteCompany)

export default router;