import UsersModel from "../models/Users.model";
import RoleModel from "../models/Role.model";
import { getPagination } from "../libs/getPagination";


export const findAllAdmins = async (req, res) => {
    try{
        const roleAdmin = await RoleModel.findOne({name: 'admin'})
        const admins = await UsersModel.find({roles: roleAdmin._id})

        var params = new URLSearchParams(req.query);
        var valueNameParameter = params.get('name');

        const { size, page } = req.query;

        //if name parameter is used, give all name matches
        if(valueNameParameter != null && valueNameParameter != ""){
            valueNameParameter = valueNameParameter.toLowerCase()
            var adminsfiltered = admins.filter(admin => 
                admin.name.toLowerCase().includes(valueNameParameter)
            );
            res.json(adminsfiltered);
        }
        //if size or page parameters are used, give the corresponding size or/and page
        else if(size != undefined || page != undefined){
            const { limit, offset } = getPagination(page, size);
            const admins = await UsersModel.paginate({}, {offset, limit});
            admins.docs.reverse();
            res.json(admins.docs);
        }
        //else give all the patients
        else{
            console.log(admins);
            admins.reverse();
            res.json(admins)
        }

    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving admins',
            error: error
        })
    }
}

export const findOneAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await UsersModel.findById(id)

        if(!admin){
            return res.status(404).json({message: `Admin with id ${id} does not exist`})
        }
        else{
            res.json(admin)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving admin with id: ${req.params.id}`
        })
    }
}

export const createAdmin = async (req, res) => {
    const { name, email, password, roles } = req.body

    if (!name || !email || !password){
        return res.status(400).send({
            message: 'admins must have a name, email and password'
        })
    }
    if (roles != 'admin'){
        return res.status(400).send({
            message: 'This user does not have a admin as role'
        })
    }

    try{
        const newAdmin = new UsersModel(req.body)
        const adminRole = await RoleModel.findOne({name: roles})
        newAdmin.roles = adminRole._id;
        newAdmin.password = await UsersModel.encryptPassword(password)

        const savedAdmin = await newAdmin.save()

        res.status(200).json({
            message: 'admin created', 
            iduser: savedAdmin._id
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating admin",
            error: error
        })
    }
}

export const updateAdmin = async (req, res) => {
    try{
        console.log("flag")
        console.log(req.params.id)
        const { password, roles} = req.body;
        if(password && password != ""){
            req.body.password = await UsersModel.encryptPassword(req.body.password)
        }
        else{
            delete req.body.password
        }
        
        delete req.body.roles;
        console.log(req.body)
        const adminUpdated = await UsersModel.findByIdAndUpdate(req.params.id, req.body)
        console.log(adminUpdated)
        res.json({
            message: "admin updated",
            admin: adminUpdated
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating admin',
            error: error
        })
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const admin = await UsersModel.findByIdAndDelete(id)

        if(!admin){
            return res.status(400).send({
                message: `admin with ${id} doesn't exist`
            })
        }

        res.json({
            message: `${admin.name} with the id ${id} was deleted`
        })
    } catch (error) {
        res.status(500).json({
            message:`Error deleting the admin`,
            error: error
        })
        
      }
}