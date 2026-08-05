import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  getDashboardStats,
  getAllReports,
  updateReportStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getDashboardStats);

router.get("/reports", protect, adminOnly, getAllReports);

router.put("/report/:id/status", protect, adminOnly, updateReportStatus);

export default router;
