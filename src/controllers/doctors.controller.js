import DoctorsModel from '../models/Doctors.model'

export const findAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorsModel.find();
        res.status(200).json(doctors)
        
    } catch (error) {
        res.status(500).json({
            message: "Error finding doctors"
        })
        
    }
    
    
}

export const findOneDoctor = async (req, res) => {
    try {

        const doctor = await DoctorsModel.findById(req.params.id)
        if (!doctor) {
            return res.status(400).send({
                message: `Doctor with id ${req.params.id} not found`
            })
        }
        res.status(200).json(doctor)
        
    } catch (error) {
        res.status(500).json({
            message: "Error finding doctor"
        })
    
    }

}

export const createDoctor = async (req, res) => {
    if(!req.body.name || req.body.email || req.body.password){
        return res.status(400).send({
            message: "Error creating doctor. Form must have a name, email and password"
        })
    }

    try {
        const newDoctor = new DoctorsModel(req.body)
        const savedDoctor = await newDoctor.save()
        res.status(201).json({
            message: 'New Doctor Created'
        })
            
    } catch (error) {
        res.status(500).json({
            message: "Error creating doctor"
        })
    }
}

export const updateDoctor = async (req, res) => {
    try {
        await DoctorsModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: 'Doctor information updated correctly'
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Error updating Doctor information"
        })
        
    }
}

export const deleteDoctor = async (req, res) => {
    try {
        await DoctorsModel.findByIdAndDelete(req.params.id)
        res.json({
            message: 'Doctor deleted correctly'
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting doctor"
        })
    }

}