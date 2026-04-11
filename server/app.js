import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import certificateRoutes from "./routes/certificateRoutes.js"
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";


connectDB();
const app = express();

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.send("Backend is running");
})

app.post("/webhooks", clerkWebhooks);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificate", certificateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})