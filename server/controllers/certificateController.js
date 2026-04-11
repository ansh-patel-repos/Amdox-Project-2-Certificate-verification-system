import { Certificate } from "../models/certificateModel.js";
import { VerificationLog } from "../models/logModel.js";

export const verifyCertificate = async (req, res) => {
    try {    
        const userId = req.userId || "public";
        const { certificateId } = req.body;

        if(!certificateId) {
            return res.status(400).json({
                success: false, message: "Certificate Id is required"
            })
        }

        const certificate = await Certificate.findOne({ certificateId })

        if(!certificate) {
            return res.status(404).json({
                success: false, message: "Certificate not found"
            })
        }
        
        await VerificationLog.create({
            certificateId: certificate.certificateId,
            status: certificate ? "valid" : "Invalid",
            verifiedAt: new Date(),
            verifiedBy: userId,
        })

        return res.status(200).json({success: true, valid: true, certificate})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const getCertificateByEmail = async (req, res) => {
    try {        
        const {userEmail} = req.body;
    
        if(!userEmail) {
            return res.status(400).json({success: false, message: "Please provide user email"})
        }
    
        const certificateData = await Certificate.find({studentEmail: userEmail})
    
        if(!certificateData) {
            return res.status(400).json({success: false, message: "Certificate for this user not present"})
        }
    
        return res.status(200).json({success: true, certificateData})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
} 