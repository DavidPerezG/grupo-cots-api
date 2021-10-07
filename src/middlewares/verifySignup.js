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
        for(let i = 0; i< req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`
                })
            }
        }
    }

    next();
}

