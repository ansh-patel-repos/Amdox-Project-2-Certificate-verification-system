import { Schema, model } from "mongoose"

const registerSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    firstName: {type: String ,required: true},
    lastName: {type: String ,required: true},
    phone: {type: String, default: ""},
    organization: {type: String, default: ""},
    email: {type: String ,required: true, unique: true},
    role: {type: String, enum: ['admin', 'student'], default: 'student'}
},
    { timestamps: true }
) 

export const User = model("User", registerSchema);
