import { FileText, CheckCircle, Clock3, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const stats = [
    { label: "Total Reports", value: 12, icon: FileText, color: "blue" },
    { label: "Resolved", value: 5, icon: CheckCircle, color: "green" },
    { label: "In Progress", value: 4, icon: Clock3, color: "yellow" },
    { label: "Open", value: 3, icon: AlertCircle, color: "red" },
  ];

  const reports = [
    {
      title: "Absence of StreetLight",
      description:
        "There is no functioning streetlight in this area, making the surroundings dark after sunset and unsafe for pedestrians.",
      category: "Streetlight",
      location: "17.3046, 78.5412",
      status: "Reported",
      upvotes: 8,
      time: "2 days ago",
      progress: 60,
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="header-text">
              <h1>My Dashboard</h1>
            </div>
            <div className="impact-card">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&auto=format&fit=crop"
                alt="community"
              />
              <div className="impact-info">
                <p className="impact-label">Community Impact</p>
                <span className="impact-desc">
                  Your reports helped improve 3 local areas
                </span>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-top">
                  <stat.icon
                    className={`stat-icon icon-${stat.color}`}
                    strokeWidth={2.2}
                  />
                  <span className={`stat-value text-${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-tabs">
            <button className="tab-btn active">My Reports</button>
            <button className="tab-btn">Upvoted</button>
          </div>

          <div className="reports-list">
            {reports.map((report) => (
              <div key={report.title} className="report-card">
                <div className="report-image-container">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="report-image"
                  />
                </div>
                <div className="report-content">
                  <div className="report-header-row">
                    <div className="title-group">
                      <h2>{report.title}</h2>
                      <p className="description">{report.description}</p>
                    </div>
                    <span className="status-badge">{report.status}</span>
                  </div>

                  <div className="report-meta">
                    <span className="meta-item">💡 {report.category}</span>
                    <span className="meta-item">📍 {report.location}</span>
                    <span className="meta-item">🕒 {report.time}</span>
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Resolution Progress</span>
                      <span className="progress-perc">{report.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${report.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="upvotes">🔥 {report.upvotes} upvotes</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
