import CompaniesModel from "../models/Companies.model";
import RoleModel from "../models/Role.model";
import UsersModel from "../models/Users.model";


export const findAllCompanies = async (req, res) => {
    try {
        const companies = await CompaniesModel.find();
        var params = new URLSearchParams(req.query);
        var valueP = params.get('name');
        const { size, page } =  req.query;
        if(valueP != null && valueP != ""){
            valueP = valueP.toLowerCase()

            var companiesfiltered =  companies.filter(company => company = company.name_company.toLowerCase().includes(valueP));
            res.json(companiesfiltered.reverse()) 

        }
        else if (size === undefined && page === undefined){
            res.json(companies.reverse())
            
        }
        else{

            const {limit, offset} = getPagination(page, size);

            const companies = await CompaniesModel.paginate({}, { offset, limit });
            companies.docs.reverse();
            res.json(companies.docs)
        }


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
        phone_number,
        roles
    } = req.body;

    if(!name_company || !email || !password || !address){
        return res.status(400).send({
            message: 'Company must have a name, email, password and address'
        })
    }



    try {
        const role = await RoleModel.findOne({name: roles})

        const newCompany = new CompaniesModel({
            name_company, 
            email, 
            password: await CompaniesModel.encryptPassword(password),
            address, 
            image, 
            phone_number,
            roles: role._id
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
        console.log('companies')
        if(req.body.password && req.body.password != "" && req.body.password != null){
            req.body.password = await CompaniesModel.encryptPassword(req.body.password)
        }
        else{
            delete req.body.password
        }
        console.log(req.body)
        console.log(req.params.id)
        const Company = await CompaniesModel.findByIdAndUpdate(req.params.id, req.body)
        
        res.json({
            message: "Company updated",
            company:Company
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