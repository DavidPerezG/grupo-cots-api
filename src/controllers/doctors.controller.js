import DoctorsModel from "../models/Doctors.model";
import UsersModel from "../models/Users.model";
import RoleModel from "../models/Role.model";
import { getPagination } from "../libs/getPagination";


export const findAllDoctors = async (req, res) => {
    try{
        const roleDoctor = await RoleModel.findOne({name: 'doctor'})
        const doctors = await UsersModel.find({roles: roleDoctor._id})

        var params = new URLSearchParams(req.query);
        var valueNameParameter = params.get('name');

        const { size, page } = req.query;

        //if name parameter is used, give all name matches
        if(valueNameParameter != null && valueNameParameter != ""){
            valueNameParameter = valueNameParameter.toLowerCase()
            var doctorsfiltered = patients.filter(doctor => 
                doctor.name.toLowerCase().includes(valueNameParameter)
            );
            res.json(doctorsfiltered);
        }
        //if size or page parameters are used, give the corresponding size or/and page
        else if(size != undefined || page != undefined){
            const { limit, offset } = getPagination(page, size);
            const doctors = await DoctorsModel.paginate({}, {offset, limit});
            doctors.docs.reverse();
            res.json(doctors.docs);
        }
        //else give all the patients
        else{
            doctors.reverse();
            res.json(doctors)
        }

    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving doctors',
            error: error
        })
    }
}

export const findOneDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await DoctorsModel.findById(id)

        if(!doctor){
            return res.status(404).json({message: `Doctor with id ${id} does not exist`})
        }
        else{
            res.json(doctor)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving doctor with id: ${req.params.id}`
        })
    }
}

export const createDoctor = async (req, res) => {
    const { name, email, password, roles } = req.body

    if (!name || !email || !password){
        return res.status(400).send({
            message: 'Doctors must have a name, email and password'
        })
    }
    if (roles != 'doctor'){
        return res.status(400).send({
            message: 'This user does not have a doctor as role'
        })
    }

    try{
        const newDoctor = new DoctorsModel(req.body)
        const doctorRole = await RoleModel.findOne({name: roles})
        newDoctor.roles = doctorRole._id;
        newDoctor.password = await DoctorsModel.encryptPassword(password)

        const savedDoctor = await newDoctor.save()

        res.status(200).json({
            message: 'Doctor created', 
            iduser: savedDoctor._id
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating doctor",
            error: error
        })
    }
}

export const updateDoctor = async (req, res) => {
    try{
        const { password, roles } = req.body;
        if(password && password != ""){
            req.body.password = await DoctorsModel.encryptPassword(req.body.password)
        }
        else{
            delete req.body.password
        }
        if(roles != 'doctor'){
            res.json({
                message: 'This user does not have doctor as role'
            })
        }
        delete req.body.roles;

        const doctorUpdated = await DoctorsModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: "Doctor updated",
            doctor: doctorUpdated
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating doctor',
            error: error
        })
    }
}

export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await DoctorsModel.findByIdAndDelete(id)

        if(!doctor){
            return res.status(400).send({
                message: `doctor with ${id} doesn't exist`
            })
        }

        res.json({
            message: `${doctor.name} with the id ${id} was deleted`
        })
    } catch (error) {
        res.status(500).json({
            message:`Error deleting the doctor`
        })
        
      }
}