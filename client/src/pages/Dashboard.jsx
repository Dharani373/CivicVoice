import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FileText, CheckCircle, Clock3, AlertCircle, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import socket from "../socket";

export default function Dashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();

    socket.on("newReport", (newReport) => {
      setReports((prevReports) => [newReport, ...prevReports]);
    });

    socket.on("statusUpdated", (updatedReport) => {
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === updatedReport._id ? updatedReport : report,
        ),
      );
    });

    return () => {
      socket.off("newReport");
      socket.off("statusUpdated");
    };
  }, []);
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handleUpvote = async (reportId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/reports/${reportId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Refresh reports after upvoting
      fetchReports();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to upvote.");
    }
  };

  const stats = [
    {
      label: "Total Reports",
      value: reports.length,
      icon: FileText,
      color: "blue",
    },
    {
      label: "Resolved",
      value: reports.filter((r) => r.status === "Resolved").length,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "In Progress",
      value: reports.filter((r) => r.status === "In Progress").length,
      icon: Clock3,
      color: "yellow",
    },
    {
      label: "Open",
      value: reports.filter((r) => r.status === "Open").length,
      icon: AlertCircle,
      color: "red",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-container">
          {/* HEADER */}

          <div className="dashboard-header">
            <div className="header-left">
              <h1>My Dashboard</h1>
              <p>Manage and track your civic issue reports.</p>
            </div>

            <div className="header-right">
              <button
                className="report-btn"
                onClick={() => navigate("/report")}
              >
                <Plus size={18} />
                <span>Report Issue</span>
              </button>
            </div>
          </div>

          {/* STATS */}

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-top">
                  <stat.icon
                    className={`stat-icon icon-${stat.color}`}
                    strokeWidth={2.2}
                  />

                  <span className={`stat-value icon-${stat.color}`}>
                    {stat.value}
                  </span>
                </div>

                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* TABS */}

          <div className="dashboard-tabs">
            <button className="tab-btn active">My Reports</button>

            <button className="tab-btn">Upvoted</button>
          </div>

          {/* REPORTS */}

          <div className="reports-list">
            {reports.length === 0 ? (
              <div className="no-reports">
                <FileText size={70} className="empty-icon" />

                <h3>No Reports Yet</h3>

                <p>
                  Start making your community better by reporting your first
                  civic issue.
                </p>

                <button
                  className="report-btn"
                  onClick={() => navigate("/report")}
                >
                  <Plus size={18} />
                  <span>Report Issue</span>
                </button>
              </div>
            ) : (
              reports.map((report) => (
                <div key={report._id} className="report-card">
                  <div className="report-image-container">
                    <img
                      className="report-image"
                      src={
                        report.image ||
                        "https://via.placeholder.com/500x300?text=No+Image"
                      }
                      alt={report.title}
                    />
                  </div>

                  <div className="report-content">
                    <div className="report-header">
                      <div>
                        <h2>{report.title}</h2>

                        <p className="description">{report.description}</p>
                      </div>

                      <span
                        className={`status-badge ${report.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <div className="report-meta">
                      <span>💡 {report.category}</span>

                      <span>
                        <p>
                          📍{" "}
                          {report.address
                            ? report.address
                            : `${report.location?.latitude}, ${report.location?.longitude}`}
                        </p>
                      </span>

                      <span>
                        🗓️ {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="report-footer">
                      <button
                        className="upvote-btn"
                        onClick={() => handleUpvote(report._id)}
                      >
                        👍 {report.upvotes?.length || 0} Upvotes
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
