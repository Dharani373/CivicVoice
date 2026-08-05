import Report from "../models/Report.js";
import User from "../models/User.js";
import { io } from "../server.js";

// Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();

    const openReports = await Report.countDocuments({
      status: "Open",
    });

    const inProgressReports = await Report.countDocuments({
      status: "In Progress",
    });

    const resolvedReports = await Report.countDocuments({
      status: "Resolved",
    });

    const totalUsers = await User.countDocuments({
      role: "citizen",
    });

    res.json({
      totalReports,
      openReports,
      inProgressReports,
      resolvedReports,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Report Status
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    report.status = status;

    await report.save();

    //  Notify all connected clients
    io.emit("statusUpdated", report);

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
