import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.get("/", (req, res) => {
    res.send("Backend is running");
})

app.post("/webhooks", clerkWebhooks);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})