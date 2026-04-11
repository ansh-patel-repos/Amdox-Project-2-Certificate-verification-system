import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { getAllCertificates, getAllUploadedFilesData, getLogs, uploadCertificate, getCertiDataByFileId, deleteCertiData } from "../controllers/adminController.js";
import { protectUser } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/upload-certificate", requireAuth(), protectUser, requireAdmin, upload.single("file"), uploadCertificate)
router.get("/logs", requireAuth(), protectUser, requireAdmin, getLogs);
router.get("/getAllCertificates", requireAuth(), protectUser, requireAdmin, getAllCertificates)
router.get("/getUploadedFiles", requireAuth(), protectUser, requireAdmin, getAllUploadedFilesData)
router.post("/getCertificateByFileId", requireAuth(), protectUser, requireAdmin, getCertiDataByFileId);
router.delete("/deleteCertificateData", requireAuth(), protectUser, requireAdmin, deleteCertiData);

export default router;