import { Router } from "express";
import { verifyCertificate } from "../controllers/certificateController.js";
import { protectUser } from "../middleware/authMiddleware.js";
import { requireAuth } from "@clerk/express";
import { getCertificateByEmail } from "../controllers/certificateController.js";
import { optionalAuth } from "../middleware/optionalAuthMiddleware.js";

const router = Router();

router.post("/verify", optionalAuth, verifyCertificate);
router.post("/getCertiByEmail", requireAuth(), protectUser, getCertificateByEmail)

export default router;