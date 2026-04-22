import xlsx from "xlsx";
import { Certificate, Upload } from "../models/certificateModel.js";
import { VerificationLog } from "../models/logModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { createCanvas } from "canvas";

const excelSerialToDate = (serial) => {
  const num = Number(serial);
  if (isNaN(num) || num < 1) return null;
  return new Date(Math.round((num - 25569) * 86400 * 1000));
};

const formatDate = (raw) => {
  if (!raw) return "";

  if (typeof raw === "string" && raw.includes("-")) {
    const [year, month, day] = raw.split("-");

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const d = new Date(raw);
  if (isNaN(d)) return String(raw);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const toStorableDate = (raw) => {
  if (!raw) return "";

  const num = Number(raw);

  if (!isNaN(num) && num > 1000) {
    const utc_days = Math.floor(num - 25569);
    const utc_value = utc_days * 86400;

    const date = new Date(utc_value * 1000);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const localDate = new Date(year, month, day);

    return localDate.toISOString().split("T")[0];
  }

  const d = new Date(raw);
  if (!isNaN(d)) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
      .toISOString()
      .split("T")[0];
  }

  return String(raw);
};

const generateCertificate = async (student) => {
  const canvas = createCanvas(1200, 900);
  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#1a3c8f";
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, W - 40, H - 40);

  ctx.textAlign = "center";
  ctx.fillStyle = "#000";

  ctx.font = "bold 45px Arial";
  ctx.fillText("CERTIFICATE OF INTERNSHIP", cx, H * 0.15);

  ctx.font = "24px Arial";
  ctx.fillText("This is to certify that", cx, H * 0.25);

  ctx.font = "bold 55px Arial";
  ctx.fillText((student.studentName || "").toUpperCase(), cx, H * 0.38);

  ctx.font = "24px Arial";
  ctx.fillText("has successfully completed internship in", cx, H * 0.48);

  ctx.font = "bold 32px Arial";
  ctx.fillText(student.internshipDomain || "", cx, H * 0.56);

  const startDate = formatDate(student.internshipStartDate);
  const endDate = formatDate(student.internshipEndDate);

  ctx.font = "22px Arial";
  ctx.fillText(`from ${startDate} to ${endDate}`, cx, H * 0.64);

  ctx.font = "20px Arial";
  ctx.fillText(`Issued by ${student.issuedBy || ""}`, cx, H * 0.72);

  const issuedDate = formatDate(student.issueDate || student.issuedDate);

  ctx.fillText(`Date: ${issuedDate}`, cx, H * 0.78);

  ctx.font = "16px Arial";
  ctx.fillText(`Certificate ID: ${student.certificateId}`, cx, H * 0.85);

  return canvas.toBuffer("image/png");
};

export const uploadCertificate = async (req, res) => {
  try {
    const excelFile = req.file;

    if (!excelFile) {
      return res.status(400).json({
        success: false,
        message: "Excel file is required",
      });
    }

    const uploadedFileData = await Upload.create({
      fileName: excelFile.originalname,
      uploadedBy: req.userId,
      uploadedAt: new Date(),
    });

    const workbook = xlsx.read(excelFile.buffer, {
      type: "buffer",
      cellDates: true,
    });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { raw: false });

    const certificates = await Promise.all(
      data.map(async (item) => {
        const certBuffer = await generateCertificate(item);

        const uploaded = await uploadToCloudinary(certBuffer);

        return {
          clerkId: req.userId,
          fileId: uploadedFileData._id,
          certificateId: item.certificateId,
          studentName: item.studentName,
          studentEmail: item.studentEmail,
          issuedBy: item.issuedBy,
          issuedDate: toStorableDate(item.issueDate),
          internshipDomain: item.internshipDomain,
          internshipStartDate: toStorableDate(item.internshipStartDate),
          internshipEndDate: toStorableDate(item.internshipEndDate),
          certificateUrl: uploaded.secure_url,
        };
      }),
    );

    const result = await Certificate.insertMany(certificates);
    console.log(result);

    return res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await VerificationLog.find().sort({ createdAt: -1 });
    console.log(logs)
    return res.status(200).json({ success: true, logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const userId = req.userId;

    const certificates = await Certificate.find({
      clerkId: userId,
    });

    if (!certificates) {
      return res.status(400).json({
        success: false,
        message: 0,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: certificates.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUploadedFilesData = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await Upload.find({ uploadedBy: userId });

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "You haven't uploaded any file, Please upload file.",
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertiDataByFileId = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await Certificate.find({ fileId: id });

    if (!data) {
      return res
        .status(400)
        .json({ suceess: false, message: "No certificates found" });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCertiData = async (req, res) => {
  try {
    const { fileId } = req.body;

    const data = await Certificate.deleteMany({ fileId });

    if (!data.acknowledged) {
      return res.status(400).json({
        success: false,
        message:
          "Failed to delete certificates related to this file, Please try again.",
      });
    }

    const result = await Upload.deleteOne({ _id: fileId });

    if (!result.acknowledged) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete file, Please try again.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
