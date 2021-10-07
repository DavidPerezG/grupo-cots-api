import jwt from 'jsonwebtoken'
import config from '../config'
import UsersModel from '../models/Users.model'
import RoleModel from '../models/Role.model'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"].split(' ')[1];

        if (!token) return res.status(403).json({message: "No token provided"})

        console.log(token)
        if(token === 'null') {
            return res.status(401).send('Unauthorized Request');
        }

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await UsersModel.findById(req.userId, {password: 0})
        if (!user) return res.status(404).json({message: "No user found"})

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"Unauthorized",
            error: error
        })

        
    }
}

export const verifyDoctor = async (req, res, next) => {
    const user = await UsersModel.findById(req.userId)
    const roles = await RoleModel.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === "doctor") {
            next()
            return;
        }
    }

    return res.status(403).json({message: "Request Doctor role"});




}

export const verifyAdmin = async (req, res, next) => {
    const user = await UsersModel.findById(req.userId)
    const roles = await RoleModel.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin") {
            next()
            return;
        }
    }

    return res.status(403).json({message: "Request admin Role"});



}
