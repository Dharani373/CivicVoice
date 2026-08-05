import Report from "../models/Report.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs-extra";
import path from "path";
import { reverseGeocode } from "../utils/reverseGeocode.js";
import { io } from "../server.js";

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reports created by the logged-in user
export const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({
      user: req.user._id,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create a new report
export const createReport = async (req, res) => {
  try {
    const { title, description, category, latitude, longitude } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image.",
      });
    }

    console.log("========== FILE ==========");
    console.log(req.file);
    console.log("Buffer exists:", !!req.file?.buffer);
    console.log("Buffer length:", req.file?.buffer?.length);

    // Create uploads folder if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads");
    await fs.ensureDir(uploadsDir);

    // Save uploaded image temporarily
    const tempFile = path.join(
      uploadsDir,
      `${Date.now()}-${req.file.originalname}`,
    );

    await fs.writeFile(tempFile, req.file.buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFile, {
      folder: "CivicVoice",
    });

    // Delete temporary file
    await fs.remove(tempFile);

    const imageUrl = result.secure_url;

    // Convert coordinates to address
    const locationInfo = await reverseGeocode(latitude, longitude);

    // Save report in MongoDB
    const report = await Report.create({
      title,
      description,
      category,

      location: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },

      city: locationInfo.city,
      state: locationInfo.state,
      address: locationInfo.address,

      image: imageUrl,
      user: req.user._id,
    });

    // Populate user information
    const populatedReport = await Report.findById(report._id).populate(
      "user",
      "name email",
    );

    // Emit to every connected client
    io.emit("newReport", populatedReport);

    res.status(201).json(populatedReport);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create report.",
      error: error.message,
    });
  }
};

// Toggle Upvote
export const toggleUpvote = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // Ensure old documents also have an upvotes array
    if (!Array.isArray(report.upvotes)) {
      report.upvotes = [];
    }

    const userId = req.user._id.toString();

    const alreadyUpvoted = report.upvotes.some(
      (id) => id.toString() === userId,
    );

    if (alreadyUpvoted) {
      report.upvotes = report.upvotes.filter((id) => id.toString() !== userId);
    } else {
      report.upvotes.push(req.user._id);
    }

    await report.save();

    return res.status(200).json({
      message: alreadyUpvoted
        ? "Upvote removed successfully"
        : "Upvoted successfully",
      totalUpvotes: report.upvotes.length,
      hasUpvoted: !alreadyUpvoted,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
