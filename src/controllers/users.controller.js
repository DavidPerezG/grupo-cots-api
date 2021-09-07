import UsersModel from "../models/Users.model";
import RoleModel from "../models/Role.model";

//Encuentra todos los usuarios registrados
export const findAllUsers = async (req, res) => {
    try {
        const Users = await UsersModel.find();
        res.json(Users)
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
    const { name, email ,password, roles } = req.body
    
    if (!name || !email || !password){
        return res.status(400).send({
            message: 'User must have a name, email and password'
        })
    }

    try {
        const newUser = new UsersModel({
            name, 
            email,
            password: await UsersModel.encryptPassword(password)
        })
    
        if (roles) {
            const foundRoles = await RoleModel.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await RoleModel.findOne({name: "user"})
            newUser.roles = [role._id];
        }
    
        const savedUser = await newUser.save() 

        res.status(200).json({message: "User created"})


    } catch (error) {
        console.error(error)
    }
}

//Actualizar datos de un usuario
export const updateUser = async (req, res) => {
    try {
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