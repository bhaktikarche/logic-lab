import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SubmissionsPage.css";
import { FiCode, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/submissions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      }
    };

    fetchSubmissions();
  }, [navigate]);

  return (
    <div className="submissions-page">
      <header className="submissions-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <h1 className="logo"><FiCode /> Logic Lab</h1>
      </header>

      <div className="submissions-container">
        <h2>📜 Your Submissions</h2>
        {submissions.length === 0 ? (
          <p>No submissions yet. Go solve some problems!</p>
        ) : (
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Language</th>
                <th>Status</th>
                <th>Output</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.question_title}</td>
                  <td>{submission.language}</td>
                  <td className={submission.status.toLowerCase()}>
                    {submission.status}
                  </td>
                  <td>
                    <pre className="output-snippet">{submission.output}</pre>
                  </td>
                  <td>{new Date(submission.submitted_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubmissionsPage;
