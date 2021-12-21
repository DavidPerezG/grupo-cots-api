import PatientsModel from "../models/Patients.model";
import UsersModel from "../models/Users.model";
import RoleModel from "../models/Role.model";
import { getPagination } from "../libs/getPagination";


export const findAllPatients = async (req, res) => {
    try{
        const rolePatient = await RoleModel.findOne({name: 'patient'})
        const patients = await UsersModel.find({roles: rolePatient._id})

        var params = new URLSearchParams(req.query);
        var valueNameParameter = params.get('name');

        const { size, page } = req.query;

        //if name parameter is used, give all name matches
        if(valueNameParameter != null && valueNameParameter != ""){
            valueNameParameter = valueNameParameter.toLowerCase()
            var patientsfiltered = patients.filter(patient => 
                patient.name.toLowerCase().includes(valueNameParameter)
            );
            res.json(patientsfiltered);
        }
        //if size or page parameters are used, give the corresponding size or/and page
        else if(size != undefined || page != undefined){
            const { limit, offset } = getPagination(page, size);
            const patients = await PatientsModel.paginate({}, {offset, limit});
            patients.docs.reverse();
            res.json(patients.docs);
        }
        //else give all the patients
        else{
            patients.reverse();
            res.json(patients)
        }

    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving patients',
            error: error
        })
    }
}

export const findOnePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const Patient = await PatientsModel.findById(id)

        if(!Patient){
            return res.status(404).json({message: `Patient with id ${id} does not exist`})
        }
        else{
            res.json(Patient)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving Patient with id: ${req.params.id}`
        })
    }
}

export const createPatient = async (req, res) => {
    const { first_name, email, password, roles } = req.body

    if (!first_name || !email || !password){
        return res.status(400).send({
            message: 'Patients must have a first name, email and password'
        })
    }
    if (roles != 'patient'){
        return res.status(400).send({
            message: 'This user does not have a patient as role'
        })
    }

    try{
        const newPatient = new PatientsModel(req.body)
        const patientRole = await RoleModel.findOne({name: roles})
        newPatient.roles = patientRole._id;
        newPatient.password = await PatientsModel.encryptPassword(password)

        const savedPatient = await newPatient.save()

        res.status(200).json({
            message: 'Patient created', 
            iduser: savedUser._id
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating patient",
            error: error
        })
    }
}

export const updatePatient = async (req, res) => {
    try{
        const { password, roles } = req.body;
        if(password && password != ""){
            req.body.password = await PatientsModel.encryptPassword(req.body.password)
        }
        else{
            delete req.body.password
        }
        if(roles != 'patient'){
            res.json({
                message: 'This user does not have patient as role'
            })
        }
        delete req.body.roles;

        const patientUpdated = await PatientsModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: "Patient updated",
            patient: patientUpdated
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating patient',
            error: error
        })
    }
}

export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params
        const patient = await PatientsModel.findByIdAndDelete(id)

        if(!patient){
            return res.status(400).send({
                message: `patient with ${id} doesn't exist`
            })
        }

        res.json({
            message: `${patient.name} with the id ${id} was deleted`
        })
    } catch (error) {
        res.status(500).json({
            message:`Error deleting the patient`
        })
        
      }
}