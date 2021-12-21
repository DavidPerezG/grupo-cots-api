import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const secretarySchema = new Schema({
    id_company: {
        type: Schema.Types.ObjectId,
        
    },
    name: { 
        type: String,
        required: true,
        trim: true    
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: {
        ref: "Role",
        type: Schema.Types.ObjectId,
    },


},{
    versionKey: false,
    timestamps: true

})

secretarySchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

secretarySchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model('Secretary', secretarySchema, 'users');