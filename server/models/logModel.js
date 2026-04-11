import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    certificateId: String,
    status: String,
    verifiedAt: Date,
    verifiedBy: String,
}, {timestamps: true})

export const VerificationLog = mongoose.model("VerificationLog", logSchema)