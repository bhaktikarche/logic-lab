import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QuestionList.css";

const allQuestions = [
  { id: 1, title: "Two Sum", difficulty: "Easy", subject: "javascript" },
  {
    id: 2,
    title: "Reverse a String",
    difficulty: "Easy",
    subject: "javascript",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    subject: "javascript",
  },
  { id: 4, title: "Merge K Sorted Lists", difficulty: "Hard", subject: "cpp" },
  { id: 5, title: "BCNF Decomposition", difficulty: "Medium", subject: "dbms" },
];

export default function QuestionList() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const questions = allQuestions.filter((q) => q.subject === subject);

  return (
    <div className="question-list-container">
      <div className="question-list-header">
        <h2>
          <i className="fas fa-book"></i> {subject.toUpperCase()} Questions
        </h2>

        <div className="profile-section">
          <span>
            <i className="fas fa-user"></i> {user}
          </span>

          <button
            className="dashboard-button"
            onClick={() => navigate("/dashboard")}
          >
            <i className="fas fa-chart-line"></i> Dashboard
          </button>

          <button
            className="submissions-button"
            onClick={() => navigate("/submissions")}
          >
            <i className="fas fa-list-alt"></i> Submissions
          </button>

          <button onClick={handleLogout} className="logout-button">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q.id} className="question-card">
            <div>
              <h3 className="question-title">
                <i className="fas fa-circle-question"></i> {q.title}
              </h3>
              <p className={`difficulty ${q.difficulty.toLowerCase()}`}>
                <i className="fas fa-bolt"></i> Difficulty: {q.difficulty}
              </p>
            </div>
            <button
              className="solve-button"
              onClick={() => navigate(`/solve/${subject}/${q.id}`)}
            >
              <i className="fas fa-play"></i> Solve
            </button>
          </div>
        ))
      ) : (
        <p className="no-questions">No questions available for this subject.</p>
      )}
    </div>
  );
}
