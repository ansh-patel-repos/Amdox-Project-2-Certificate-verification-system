import { User } from "../models/authModel.js";

export const protectUser = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    
    const user = await User.findOne({
      clerkId: userId,
    });
    
    req.userId = userId;
    req.user = user.role
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
