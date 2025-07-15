import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Dashboard.css";

const subjects = [
  { id: "javascript", name: "JavaScript", icon: "fab fa-js" },
  { id: "cpp", name: "C++", icon: "fas fa-code" },
  { id: "dbms", name: "DBMS", icon: "fas fa-database" },
  { id: "os", name: "Operating Systems", icon: "fas fa-desktop" },
];

export default function Dashboard() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 500);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className={`dashboard-wrapper ${darkMode ? "dark" : "light"}`}>
      <main className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="profile-container" ref={dropdownRef}>
            <div className="profile-icon" onClick={toggleProfileDropdown}>
              <i className="fas fa-user-circle"></i>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <i className="fas fa-user-circle"></i>
                    <div>
                      <div className="dropdown-username">{user}</div>
                      {/* <div className="dropdown-email">user@example.com</div> */}
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    <i className="fas fa-user"></i>
                    <span>Profile</span>
                  </div>

                  <div className="dropdown-item toggle-row">
                    <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
                    <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => navigate("/leaderboard")}
                  >
                    <i className="fas fa-trophy"></i>
                    <span>Leaderboard</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => navigate("/bookmarks")}
                  >
                    <i className="fas fa-bookmark"></i>
                    <span>Bookmarks</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => navigate("/submissions")}
                  >
                    <i className="fas fa-upload"></i>
                    <span>Submissions</span>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="user-card">
          <i className="fas fa-user-circle user-icon"></i>
          <div>
            <h2>{user}</h2>
            <p>Welcome back to Logic Lab!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-box">
            <h3>4</h3>
            <p>Questions Solved</p>
          </div>
          <div className="stat-box">
            <h3>7</h3>
            <p>Total Submissions</p>
          </div>
          <div className="stat-box">
            <h3>Today</h3>
            <p>Last Active</p>
          </div>
        </div>

        {/* Subjects */}
        <h3 className="section-title">Subjects</h3>
        <div className="subjects-grid">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              className="subject-card"
              onClick={() => navigate(`/questions/${subj.id}`)}
            >
              <i className={`${subj.icon} subject-icon ${subj.id}-icon`}></i>
              <span className="subject-name">{subj.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
