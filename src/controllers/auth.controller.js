import UserModel from '../models/Users.model'
import jwt from 'jsonwebtoken'
import config from '../config'
import RoleModel from '../models/Role.model'

export const signIn = async (req, res) => {
    
    try {
        const userFound = await UserModel.findOne({email: req.body.email}).populate("roles")

        if(!userFound) return res.status(400).json({message: "User not found"})

        const match = await UserModel.comparePassword(req.body.password, userFound.password)

        if (!match) return res.status(401).json({token: null, message: "Invalid Password"})

        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 84600 //24 horas
        })

        res.json({
            token: token,
            iduser: userFound._id     
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error signin in'
        })
    }

}

export const signUp = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        if (!name || !email || !password){
            return res.status(400).send({
                message: 'User must have a name, email and password'
            })
        }

        const newUser = new UserModel({
            name, 
            email,
            password: await UserModel.encryptPassword(password)
        })

        if (roles) {
            const foundRoles = await RoleModel.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await RoleModel.findOne({name: "patient"})
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save()

        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 84600 //24 hours
        })

        res.status(200).json({
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error signin up'
        })
    }
    
}