import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import mongoosePaginate from 'mongoose-paginate-v2'

const companySchema = new Schema(
    {
        name_company: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,

        },
        password: {
            type: String,
            required: true,

        },
        address: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        
        phone_number: {
            type: String
        },
        
    },
    {
        versionKey: false,
        timestamps: true
    }
);

companySchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

companySchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

companySchema.plugin(mongoosePaginate);
export default model('Company', companySchema)
