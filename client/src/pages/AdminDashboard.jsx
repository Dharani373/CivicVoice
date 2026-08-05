import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import AdminAnalytics from "../components/AdminAnalytics";
import socket from "../socket";
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaSearch,
} from "react-icons/fa";

import "../styles/admin.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
    fetchReports();

    // New complaint submitted
    socket.on("newReport", (newReport) => {
      setReports((prevReports) => [newReport, ...prevReports]);

      setStats((prevStats) => ({
        ...prevStats,
        totalReports: prevStats.totalReports + 1,
        openReports: prevStats.openReports + 1,
      }));
    });

    // Status updated
    socket.on("statusUpdated", (updatedReport) => {
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === updatedReport._id ? updatedReport : report,
        ),
      );

      // Refresh stats because report moved between Open/In Progress/Resolved
      fetchStats();
    });

    return () => {
      socket.off("newReport");
      socket.off("statusUpdated");
    };
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/report/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchReports();
      fetchStats();

      if (selectedReport && selectedReport._id === id) {
        setSelectedReport({
          ...selectedReport,
          status,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Unable to update status.");
    }
  };

  if (!stats) return <h2>Loading...</h2>;

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || report.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage civic complaints and monitor platform activity.</p>
          </div>
        </div>

        {/* Statistics */}

        <div className="admin-stats">
          <div className="admin-card blue">
            <FaClipboardList className="admin-icon" />

            <div>
              <h2>{stats.totalReports}</h2>
              <p>Total Reports</p>
            </div>
          </div>
          <div className="admin-card red">
            <FaExclamationCircle className="admin-icon" />

            <div>
              <h2>{stats.openReports}</h2>
              <p>Open</p>
            </div>
          </div>

          <div className="admin-card yellow">
            <FaClock className="admin-icon" />

            <div>
              <h2>{stats.inProgressReports}</h2>
              <p>In Progress</p>
            </div>
          </div>

          <div className="admin-card green">
            <FaCheckCircle className="admin-icon" />

            <div>
              <h2>{stats.resolvedReports}</h2>
              <p>Resolved</p>
            </div>
          </div>

          <div className="admin-card purple">
            <FaUsers className="admin-icon" />

            <div>
              <h2>{stats.totalUsers}</h2>
              <p>Citizens</p>
            </div>
          </div>
        </div>
        <AdminAnalytics stats={stats} reports={reports} />

        {/* Toolbar */}

        <div className="admin-toolbar">
          <div className="search-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>Road</option>
            <option>Water</option>
            <option>Streetlight</option>
            <option>Garbage</option>
            <option>Electricity</option>
            <option>Other</option>
          </select>
        </div>

        {/* Table */}

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Citizen</th>
                <th>Category</th>
                <th>Status</th>
                <th>Upvotes</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    No complaints found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr
                    key={report._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedReport(report);
                      setShowModal(true);
                    }}
                  >
                    <td>
                      <img
                        src={report.image}
                        alt={report.title}
                        className="report-thumb"
                      />
                    </td>

                    <td>{report.title}</td>

                    <td>{report.user?.name}</td>

                    <td>
                      <span className="category-badge">{report.category}</span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${report.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td>{report.upvotes.length}</td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        className="status-select"
                        value={report.status}
                        onChange={(e) =>
                          updateStatus(report._id, e.target.value)
                        }
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}

        {showModal && selectedReport && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="report-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✕
              </button>

              <h2>{selectedReport.title}</h2>

              <img
                src={selectedReport.image}
                alt={selectedReport.title}
                className="modal-image"
              />

              <div className="modal-grid">
                <div className="detail-card">
                  <span>Citizen</span>
                  <strong>{selectedReport.user?.name}</strong>
                </div>

                <div className="detail-card">
                  <span>Category</span>
                  <strong>{selectedReport.category}</strong>
                </div>

                <div className="detail-card">
                  <span>Upvotes</span>
                  <strong>{selectedReport.upvotes.length}</strong>
                </div>

                <div className="detail-card">
                  <span>Reported On</span>
                  <strong>
                    {new Date(selectedReport.createdAt).toLocaleDateString()}
                  </strong>
                </div>
              </div>

              <h3>Description</h3>

              <p>{selectedReport.description}</p>

              <h3>Location</h3>

              <p>{selectedReport.address}</p>

              <p>
                <strong>Latitude:</strong> {selectedReport.location.latitude}
              </p>

              <p>
                <strong>Longitude:</strong> {selectedReport.location.longitude}
              </p>

              <div className="modal-status">
                <label>Status</label>

                <select
                  value={selectedReport.status}
                  onChange={(e) =>
                    updateStatus(selectedReport._id, e.target.value)
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <button
                className="map-btn"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${selectedReport.location.latitude},${selectedReport.location.longitude}`,
                    "_blank",
                  )
                }
              >
                📍 View on Google Maps
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
