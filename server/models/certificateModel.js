import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  fileName: String,
  uploadedBy: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Upload = mongoose.model("Upload", uploadSchema);

const certificateSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
      required: true,
    },
    certificateId: { type: String, required: true, unique: true },
    studentName: String,
    studentEmail: {type: String, required: true},
    internshipDomain: String,
    internshipStartDate: String,
    internshipEndDate: String,
    issuedBy: String,
    issuedDate: String,
    certificateUrl: {
      type: String,
      required: true,
    },
    status: {type: String, default: "Pending"}
  },
  { timestamps: true },
);

certificateSchema.index({ certificateId: 1, clerkId: 1 }, { unique: true });
export const Certificate = mongoose.model("Certificate", certificateSchema);
