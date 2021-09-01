import UsersModel from "../models/Users.model";

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
    
    if (!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).send({
            message: 'User must have a name, email and password'
        })
    }

    try {
        const newUser = new UsersModel(req.body)
        const userSaved = await newUser.save();
        res.json(userSaved)    
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user'
        })
        
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