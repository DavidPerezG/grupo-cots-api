import CompaniesModel from "../models/Companies.model";
import UsersModel from "../models/Users.model";


export const findAllCompanies = async (req, res) => {
    try {
        const companies = await CompaniesModel.find();
        companies.reverse();
        res.json(companies);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving companies',
            error: error
        })
    }
}

export const findOneCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const Company = await CompaniesModel.findById(id)
        if(!Company){
            return res.status(404).json({message: `Company with ${id} does not exist`})
        }

        res.json(Company);
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving Company with id: ${req.params.id}`
        })
    }
}

export const createCompany = async (req, res) => {
    const { 
        name_company, 
        email, 
        password, 
        address, 
        image, 
        phone_number 
    } = req.body;

    if(!name_company || !email || !password || !address){
        return res.status(400).send({
            message: 'Company must have a name, email, password and address'
        })
    }

    try {
        const newCompany = new CompaniesModel({
            name_company, 
            email, 
            password: await CompaniesModel.encryptPassword(password),
            address, 
            image, 
            phone_number 
        })

        const savedCompany = await newCompany.save()
        res.status(200).json({message: "Company created", idcompany: savedCompany._id})

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error creating company",
            error: error
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        if(req.body.password){
            req.body.password = await UsersModel.encryptPassword(req.body.password)
        }

        const Company = await CompaniesModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: "Company updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating company",
            error: error
        })   
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params
        const Company = await CompaniesModel.findByIdAndDelete(id)

        if(!Company){
            return res.status(400).send({
                message: `Company with id ${id} doesn't exist`
            })
        }

        res.json({
            message: `${Company.name_company} with the id ${id} was deleted`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting company',
            error: error
        })
    }
}