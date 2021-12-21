import { Schema, model } from 'mongoose'

export const ROLES = ["patient", "doctor", "admin", "secretary"];

const roleSchema = new Schema(
    {
        name: String
    },
    {
        versionKey:false,
    }
);

export default model("Role", roleSchema);