import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

Schema.Types.String.set('trim', true);


const patientSchema = new Schema({
    id_company: {
        type: Schema.Types.ObjectId,
        //required: true,
    },
    curp: {
        type: String,
        unique: true,
        maxlength: 18
    },
    rfc: {
        type: String,
        unique: true,
        maxlength: 13
    },
    employee_photo: {
        type: String,
    },
    first_name: { type: String },
    middle_name: { type: String },
    paternal_surname: { type: String },
    maternal_surname: { type: String },
    marital_status: { type: String },
    gender: { type: String },
    date_birth: { type: String },
    age: { type: Number },
    place_birth: { type: String },
    eye_color: { type: String },
    hair_color: { type: String },
    weight: { type: Number },
    nationality: { type: String },
    height: { type: Number },
    religion: { type: String },
    name_emergency: { type: String },
    telephone_emergency: { type: String },
    cellphone_emergency: { type: String },
    address: { type: String },
    email: { type: String, required: true },
    donor: { type: String },
    name_father: { type: String },
    name_mother: { type: String },
    password: { type: String, required: true },
    roles: {
        ref: "Role",
        type: Schema.Types.ObjectId,
    }
},{
    versionKey: false,
    timestamps: true
})

patientSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

patientSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}


export default model('Patient', patientSchema, 'users')