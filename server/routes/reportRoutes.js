import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

import {
  getReports,
  getMyReports,
  createReport,
  toggleUpvote,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/my-reports", protect, getMyReports);

router.get("/", getReports);

router.post("/", protect, upload.single("image"), createReport);

router.put("/:id/upvote", protect, toggleUpvote);

export default router;
