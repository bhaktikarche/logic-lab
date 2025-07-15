import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Submissions.css';

export default function Submissions() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewingCode, setViewingCode] = useState(null);

  const submissions = (JSON.parse(localStorage.getItem('submissions')) || [])
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredSubmissions = submissions.filter((sub) =>
    selectedSubject === 'all' ? true : sub.subject === selectedSubject
  );

  return (
    <div className="submissions-container">
      <h2><i className="fas fa-list-alt"></i> Your Submissions</h2>

      <div className="filter-bar">
        <label>Filter by Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="all">All</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="dbms">DBMS</option>
        </select>
      </div>

      {filteredSubmissions.length === 0 ? (
        <p className="no-submissions">No submissions found.</p>
      ) : (
        <table className="submission-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Status</th>
              <th>Time</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((sub, index) => (
              <tr key={sub.id}>
                <td>{index + 1}</td>
                <td>{sub.question}</td>
                <td className={sub.status === 'Passed' ? 'passed' : 'failed'}>
                  {sub.status}
                </td>
                <td>{new Date(sub.time).toLocaleString()}</td>
                <td>
                  <button className="view-btn" onClick={() => setViewingCode(sub)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/dashboard" className="back-btn">
        <i className="fas fa-arrow-left"></i> Back to Dashboard
      </Link>

      {viewingCode && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{viewingCode.question}</h3>
            <pre>{viewingCode.code}</pre>
            <button onClick={() => setViewingCode(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
