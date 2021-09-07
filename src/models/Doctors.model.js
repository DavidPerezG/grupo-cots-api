import { Schema, model } from 'mongoose'

const doctorSchema = new Schema({
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
    }


},{
    versionKey: false,
    timestamps: true

})

export default model('Doctor', doctorSchema);