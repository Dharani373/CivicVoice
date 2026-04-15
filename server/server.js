import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect database
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("CivicVoice backend running");
});

const PORT = process.env.PORT || 5000;

// routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
