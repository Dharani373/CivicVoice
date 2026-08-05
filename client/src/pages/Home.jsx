import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import socket from "../socket";

export default function Home() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchMyReports();

    // Real-time new complaint
    socket.on("newReport", (newReport) => {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (newReport.user?._id === currentUser.id) {
        setIssues((prevIssues) => [newReport, ...prevIssues]);
      }
    });

    // Real-time status update
    socket.on("statusUpdated", (updatedReport) => {
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === updatedReport._id ? updatedReport : issue,
        ),
      );
    });

    return () => {
      socket.off("newReport");
      socket.off("statusUpdated");
    };
  }, []);

  const fetchMyReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/reports/my-reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="home-page">
        <div className="home-container">
          <div className="home-header">
            <h1>My Complaints</h1>
            <p>Track the complaints you have reported.</p>
          </div>

          {issues.length === 0 ? (
            <div className="empty-state">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486807.png"
                alt="No Complaints"
              />

              <h2>No Complaints Yet</h2>
              <br />
              <button
                className="report-btn"
                onClick={() => navigate("/report")}
              >
                Report Your First Issue
              </button>
            </div>
          ) : (
            <div className="issue-list">
              {issues.map((issue) => (
                <div className="issue-card" key={issue._id}>
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="issue-image"
                  />

                  <div className="issue-content">
                    <div className="issue-header">
                      <h2>{issue.title}</h2>

                      <span
                        className={`issue-status ${
                          issue.status === "Open"
                            ? "status-open"
                            : issue.status === "In Progress"
                              ? "status-progress"
                              : "status-resolved"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </div>

                    <p>{issue.description}</p>

                    <div className="issue-meta">
                      <span>📍 {issue.address}</span>
                    </div>

                    <div className="issue-meta">
                      <span>🏷️ {issue.category}</span>

                      <span>
                        📅 {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="issue-upvotes">
                      👍 {issue.upvotes.length} Upvotes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
