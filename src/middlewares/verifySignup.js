import { ROLES } from '../models/Role.model'
import UsersModel from '../models/Users.model'
import CompaniesModel from '../models/Companies.model'

export const checkDuplicateEmailOfCompany = async (req, res, next) => {

    const email = await CompaniesModel.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: 'The email already exists'})

    next()
}

export const checkDuplicateEmailOfUser = async (req, res, next) => {

    const email = await UsersModel.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: 'The email already exists'})

    next()
}

export const checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        
        if(!ROLES.includes(req.body.roles)) {
            return res.status(400).json({
                message: `Role ${req.body.roles} does not exist`
            })
        }
        
    }

    next();
}

