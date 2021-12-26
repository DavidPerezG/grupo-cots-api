import UserModel from '../models/Users.model'
import CompanyModel from '../models/Companies.model'
import jwt from 'jsonwebtoken'
import config from '../config'
import RoleModel from '../models/Role.model'
import CompaniesModel from '../models/Companies.model'

export const signIn = async (req, res) => {
    
    try {


        const userFound = await UserModel.findOne({email: req.body.email}).populate("roles")
        console.log(userFound);

        if(!userFound || userFound.roles.name != 'admin') return res.status(400).json({message: "User not found"})

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

export const signInPatient = async (req, res) => {
    try {
        var userFound = await UserModel.findOne({email: req.body.email}).populate("roles")
        console.log(userFound);

        if(!userFound) {
            userFound = await CompanyModel.findOne({email:req.body.email}).populate("roles")
            if(!userFound) return res.status(400).json({message: "User not found"});

            const match = await CompanyModel.comparePassword(req.body.password, userFound.password)
            if (!match) return res.status(401).json({token: null, message: "Invalid Password"})
        } else {
            const match = await UserModel.comparePassword(req.body.password, userFound.password)
            if (!match) return res.status(401).json({token: null, message: "Invalid Password"})
        }

        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 84600 //24 horas
        })

        res.status(200).json({
            token: token,
            iduser: userFound._id,
            idcompany: 'waiting',
            userRole: userFound.roles.name
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
            newUser.roles = role._id;
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

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.params

    var user = await UserModel.findById(id);

    if(!user){
        user = await CompanyModel.findById(id)
        if(!user) return res.json({message: "User not found with this id"})
        const match = await CompaniesModel.comparePassword(oldPassword, userFound.password);
        if (!match) return res.status(401).json({token: null, message: "Old Password is incorrect"})

        const newPasswordEncrypted = await CompaniesModel.encryptPassword(newPassword);
        const UpdatedCompany = await CompaniesModel.findByIdAndUpdate(id, { password : newPasswordEncrypted })

        return res.json({message: "Password Updated"})
    }
    const match = await UserModel.comparePassword(oldPassword, userFound.password);
    if (!match) return res.status(401).json({token: null, message: "Old Password is incorrect"})

    const newPasswordEncrypted = await UserModel.encryptPassword(newPassword)
    const UpdatedUser = await UserModel.findByIdAndUpdate(id, { password : newPasswordEncrypted })

    return res.json({message: "Password Updated"})
}