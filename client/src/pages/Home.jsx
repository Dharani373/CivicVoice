import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Home() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports");
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
            <h1>Community Issues</h1>
            <p>Track and report local civic problems</p>
          </div>

          <div className="issue-list">
            {issues.map((issue) => (
              <div key={issue._id} className="issue-card">
                <img
                  src={issue.image || "https://via.placeholder.com/300"}
                  alt={issue.title}
                  className="issue-image"
                />

                <div className="issue-content">
                  <h2>{issue.title}</h2>
                  <p>{issue.description}</p>

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

                  <div className="issue-meta">
                    <span>📍 {issue.location}</span>
                    <span>🏷️ {issue.category}</span>
                    <span>🕒 {issue.createdAt?.slice(0, 10)}</span>
                  </div>

                  <div className="issue-upvotes">
                    👍 {issue.upvotes || 0} upvotes
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
