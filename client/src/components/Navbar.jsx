import { Link, useLocation } from "react-router-dom";
import { Bell, Moon, MapPin, LayoutDashboard, Plus } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <MapPin size={22} className="blue" />
        <span>CivicVoice</span>
      </div>

      <div className="navbar-center">
        <Link
          to="/home"
          className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>
      </div>

      <div className="navbar-right">
        <button className="report-btn">
          <Plus size={18} /> Report
        </button>
        <Bell size={20} />
        <Moon size={20} />
        <span>Sign Out</span>
      </div>
    </nav>
  );
}
