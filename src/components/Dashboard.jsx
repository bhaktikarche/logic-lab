import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState({
    questionsSolved: 0,
    totalSubmissions: 0,
    lastActive: "Today"
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsRes = await axios.get("http://localhost:5000/api/subjects");
        setSubjects(subjectsRes.data);
        
        const statsRes = await axios.get(`http://localhost:5000/api/users/${userData.id}/stats`);
        setStats({
          questionsSolved: statsRes.data.questionsSolved || 0,
          totalSubmissions: statsRes.data.totalSubmissions || 0,
          lastActive: statsRes.data.lastActive || "Today"
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/questions/${subjectId}`);
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
          <div className="logo-container">
            {/* <img src={logo} alt="Logic Lab Logo" className="logo" /> */}
            <h1>Logic Lab</h1>
          </div>
          <div className="profile-container" ref={dropdownRef}>
            <div className="profile-icon" onClick={toggleProfileDropdown}>
              <i className="fas fa-user-circle"></i>
              {showProfileDropdown && (
<div className={`profile-dropdown ${showProfileDropdown ? 'active' : ''}`}>                  <div className="dropdown-header">
                    <i className="fas fa-user-circle"></i>
                    <div>
                      <div className="dropdown-username">{userData?.name || "User"}</div>
                      <div className="dropdown-email">{userData?.email || "user@example.com"}</div>
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

        <div className="user-card">
          <i className="fas fa-user-circle user-icon"></i>
          <div className="user-info">
            <h2>{userData?.name || "Welcome"}</h2>
            <p>Welcome back to Logic Lab!</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-box">
            <h3>{stats.questionsSolved}</h3>
            <p>Questions Solved</p>
          </div>
          <div className="stat-box">
            <h3>{stats.totalSubmissions}</h3>
            <p>Total Submissions</p>
          </div>
          <div className="stat-box">
            <h3>{stats.lastActive}</h3>
            <p>Last Active</p>
          </div>
        </div>

        {/* Subjects */}
        <div className="subjects-section">
          <h2 className="subjects-title">Subjects</h2>
          {subjects.length === 0 ? (
            <p className="no-subjects">No subjects found.</p>
          ) : (
            <ul className="subjects-list">
              {subjects.map((subject) => (
                <li
                  key={subject.subject_id}
                  onClick={() => handleSubjectClick(subject.subject_id)}
                  className="subject-item"
                >
                  <i className={`fas ${subject.icon || "fa-book"}`}></i>
                  <span>{subject.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}