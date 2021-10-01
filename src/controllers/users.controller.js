import UsersModel from "../models/Users.model";
import RoleModel from "../models/Role.model";
import { getPagination } from "../libs/getPagination";
import { authJwt } from "../middlewares";
import { verifyAdmin } from "../middlewares/authJwt";

//Encuentra todos los usuarios registrados
export const findAllUsers = async (req, res) => {
    try {
        const users = await UsersModel.find()
        var params = new URLSearchParams(req.query);
        var valueP = params.get('name');
        const { size, page } =  req.query;
        if(valueP != null){
            valueP = valueP.toLowerCase()

            var usersfiltered =  users.filter(user => user = user.name.toLowerCase().includes(valueP));
            res.json(usersfiltered) 

        }
        else if (size === undefined && page === undefined){
            
            res.json(users)
            
        }
        else{

            const {limit, offset} = getPagination(page, size);

            const users = await UsersModel.paginate({}, { offset, limit });
            
            res.json(users.docs)
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving users'
        })
    }
}

export const findAllAdmins = async (req, res) => {
    try {
        const { size, page } =  req.query
        const roleDoctor = await RoleModel.findOne({name: 'admin'})
    
        if (size === undefined && page === undefined){
            const users = await UsersModel.find({roles: roleDoctor._id})
            res.json(users)
        }
        else{
            const {limit, offset} = getPagination(page, size);

            const users = await UsersModel.paginate({roles: roleDoctor._id}, { offset, limit });
            
            res.json(users)
        }

        
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving users'
        })
    }
}

export const findAllDoctors = async (req, res) => {
    try {
        const { size, page } =  req.query
        const roleDoctor = await RoleModel.findOne({name: 'doctor'})
    
        if (size === undefined && page === undefined){
            const users = await UsersModel.find({roles: roleDoctor._id})
            res.json(users)
        }
        else{
            const {limit, offset} = getPagination(page, size);

            const users = await UsersModel.paginate({roles: roleDoctor._id}, { offset, limit });
            
            res.json(users)
        }

        
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving users'
        })
    }
}

export const findAllPatients = async (req, res) => {
    try {
        const { size, page } =  req.query
        const roleDoctor = await RoleModel.findOne({name: 'patient'})
    
        if (size === undefined && page === undefined){
            const users = await UsersModel.find({roles: roleDoctor._id})
            res.json(users)
        }
        else{
            const {limit, offset} = getPagination(page, size);

            const users = await UsersModel.paginate({roles: roleDoctor._id}, { offset, limit });
            
            res.json(users)
        }

        
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving users'
        })
    }
}

export const findOneUser = async (req, res) => {
    try {
        const { id } = req.params
        const User = await UsersModel.findById(id)

        if (!User){
            return res.status(404).json({message: `User with id ${id} does not exist`})
        }
        res.json(User)
        
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving User with id: ${req.params.id}`
        })
    }
}

//Registra a un nuevo usuario
export const createUser = async (req, res) => {
    console.log(req.file)
    const { name, email ,password, image ,roles } = req.body
    
    if (!name || !email || !password){
        return res.status(400).send({
            message: 'User must have a name, email and password'
        })
    }

    try {
        const newUser = new UsersModel({
            name, 
            email,
            password: await UsersModel.encryptPassword(password),
            image
        })
    
        if (roles) {
            const foundRoles = await RoleModel.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const rolePatient = await RoleModel.findOne({name: "user"})
            newUser.roles = [rolePatient._id];
        }
    
        const savedUser = await newUser.save() 

        res.status(200).json({message: "User created", iduser: savedUser._id})


    } catch (error) {
        console.error(error)
    }
}

//Actualizar datos de un usuario
export const updateUser = async (req, res) => {
    try {
        if(req.body.password){
            req.body.password = await UsersModel.encryptPassword(req.body.password)
        }
       
        const User = await UsersModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: "User updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating user"
        })
    }
}

//Eliminar a un usuario por id
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const User = await UsersModel.findByIdAndDelete(id)

        if(!User){
            return res.status(400).send({
                message: `User with ${id} doesn't exist`
            })
        }

        res.json({
            message: `${User.name} with the id ${id} was deleted`
        })
    } catch (error) {
        res.status(500).json({
            message:`Error deleting the user`
        })
        
    }
}