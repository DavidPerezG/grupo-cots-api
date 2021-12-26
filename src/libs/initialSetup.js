import RoleModel from '../models/Role.model'

export const createRoles = async () => {

    //This const defines all the different roles
    const roles = ['patient', 'doctor', 'admin', 'secretary', 'company']

    try {
        const count = await RoleModel.estimatedDocumentCount()
        if (count == roles.length) return;

        for (var i = 0; i < roles.length; i++){
            var role = await RoleModel.find({name: roles[i]})
            if(role == false){
                var newRole = await new RoleModel({name: roles[i]}).save();
                console.log(newRole);
            }
            console.log(roles[i])
            console.log(role)
        }
        
        
    
        // const values = await Promise.all([
        //     new RoleModel({name: 'patient'}).save(),
        //     new RoleModel({name: 'doctor'}).save(),
        //     new RoleModel({name: 'admin'}).save(),
        //     new RoleModel({name: 'secretary'}).save(),
        // ]


    } catch (error) {
        console.error(error);
    }
   
}
