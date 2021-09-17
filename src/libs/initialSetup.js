import RoleModel from '../models/Role.model'

export const createRoles = async () => {

    try {
        const count = await RoleModel.estimatedDocumentCount()

        if (count > 0) return;
    
        const values = await Promise.all([
            new RoleModel({name: 'patient'}).save(),
            new RoleModel({name: 'doctor'}).save(),
            new RoleModel({name: 'admin'}).save(),
        ])

        console.log({
            values
        })

    } catch (error) {
        console.error(error);
    }
   
}
