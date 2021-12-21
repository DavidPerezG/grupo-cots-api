import SecretaryModel from "../models/Secretary.model";
import UsersModel from "../models/Users.model";
import RoleModel from "../models/Role.model";
import { getPagination } from "../libs/getPagination";


export const findAllSecretaries = async (req, res) => {
    try{
        const roleSecretary = await RoleModel.findOne({name: 'secretary'})
        const Secretaries = await UsersModel.find({roles: roleSecretary._id})

        var params = new URLSearchParams(req.query);
        var valueNameParameter = params.get('name');

        const { size, page } = req.query;

        //if name parameter is used, give all name matches
        if(valueNameParameter != null && valueNameParameter != ""){
            valueNameParameter = valueNameParameter.toLowerCase()
            var Secretariesfiltered = Secretaries.filter(secretary => 
                secretary.name.toLowerCase().includes(valueNameParameter)
            );
            res.json(Secretariesfiltered);
        }
        //if size or page parameters are used, give the corresponding size or/and page
        else if(size != undefined || page != undefined){
            const { limit, offset } = getPagination(page, size);
            const Secretaries = await SecretaryModel.paginate({}, {offset, limit});
            Secretaries.docs.reverse();
            res.json(Secretaries.docs);
        }
        //else give all the patients
        else{
            Secretaries.reverse();
            res.json(Secretaries)
        }

    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving Secretaries',
            error: error
        })
    }
}

export const findOneSecretary = async (req, res) => {
    try {
        const { id } = req.params;
        const secretary = await SecretaryModel.findById(id)

        if(!secretary){
            return res.status(404).json({message: `secretary with id ${id} does not exist`})
        }
        else{
            res.json(secretary)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving secretary with id: ${req.params.id}`
        })
    }
}

export const createSecretary = async (req, res) => {
    const { name, email, password, roles } = req.body

    if (!name || !email || !password){
        return res.status(400).send({
            message: 'Secretaries must have a name, email and password'
        })
    }
    if (roles != 'secretary'){
        return res.status(400).send({
            message: 'This user does not have a secretary as role'
        })
    }

    try{
        const newSecretary = new SecretaryModel(req.body)
        const secretaryRole = await RoleModel.findOne({name: roles})
        newSecretary.roles = secretaryRole._id;
        newSecretary.password = await SecretaryModel.encryptPassword(password)

        const savedSecretary = await newSecretary.save()

        res.status(200).json({
            message: 'secretary created', 
            iduser: savedSecretary._id
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating secretary",
            error: error
        })
    }
}

export const updateSecretary = async (req, res) => {
    try{
        const { password, roles } = req.body;
        if(password && password != ""){
            req.body.password = await SecretaryModel.encryptPassword(req.body.password)
        }
        else{
            delete req.body.password
        }
        if(roles != 'secretary'){
            res.json({
                message: 'This user does not have secretary as role'
            })
        }
        delete req.body.roles;

        const secretaryUpdated = await SecretaryModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: "secretary updated",
            secretary: secretaryUpdated
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating secretary',
            error: error
        })
    }
}

export const deleteSecretary = async (req, res) => {
    try {
        const { id } = req.params
        const secretary = await SecretaryModel.findByIdAndDelete(id)

        if(!secretary){
            return res.status(400).send({
                message: `secretary with ${id} doesn't exist`
            })
        }

        res.json({
            message: `${secretary.name} with the id ${id} was deleted`
        })
    } catch (error) {
        res.status(500).json({
            message:`Error deleting the secretary`
        })
        
      }
}