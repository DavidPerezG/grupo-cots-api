import { Router } from 'express';
import * as companyController from '../controllers/companies.controller';
import { verifySignup } from '../middlewares' 

const router = Router()

router.get('/', companyController.findAllCompanies)
router.get('/:id', companyController.findOneCompany)
router.post('/', [verifySignup.checkDuplicateEmailOfCompany], companyController.createCompany)
router.put('/:id', companyController.updateCompany)
router.delete('/:id', companyController.deleteCompany)

export default router;