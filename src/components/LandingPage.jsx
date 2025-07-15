import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; 

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <h1 className="logo">🚀 Logic Lab</h1>
        <nav>
          <button onClick={() => navigate("/login")} className="btn">Login</button>
          <button onClick={() => navigate("/signup")} className="btn-outline">Sign Up</button>
        </nav>
      </header>

      <main className="landing-main">
        <h2>Sharpen your coding skills</h2>
        <p>Practice real-world coding problems and track your progress.</p>
        <button className="cta" onClick={() => navigate("/login")}>Start Solving</button>
      </main>

      <section className="features">
        <div className="feature-card">
          <i className="fas fa-code"></i>
          <h3>Solve Challenges</h3>
          <p>Work on language-specific coding questions.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-chart-line"></i>
          <h3>Track Progress</h3>
          <p>See how far you've come and level up your skills.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-trophy"></i>
          <h3>Climb the Leaderboard</h3>
          <p>Compete with friends and others worldwide.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2025 Logic Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
