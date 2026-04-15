import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// GET all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
