import { User } from "../models/authModel.js";

export const user = async (req, res) => {
    try {
        const userId = req.userId;        

        const user = await User.findOne({
            clerkId: userId
        });

        return res.status(200).json({
            success: true, user
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: error.message
        })
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const updatedUserData = req.body;

        const updatedDBData = await User.findOneAndUpdate({clerkId: updatedUserData.clerkId}, updatedUserData)
        
        if(!updatedDBData) {
            return res.status(400).json({success: false, message: "Data isn't updated, Please try again."})
        }
        
        return res.status(200).json({success: true, updatedDBData})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}