import { Router } from "express";
import { user, updateUserInfo } from "../controllers/authController.js";
import { requireAuth } from "@clerk/express";
import { protectUser } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/user", requireAuth(), protectUser, user)
router.patch("/updateUserDetails", requireAuth(), protectUser, updateUserInfo)

export default router;