import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SolvePage.css';

export default function SolvePage() {
  const { id } = useParams();

  return (
    <div className="solve-page-container">
      <div className="solve-header">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Questions
        </Link>
        <h2>
          <i className="fas fa-terminal"></i> Solve Question #{id}
        </h2>
      </div>

      <div className="question-details">
        <h3>Question Title Placeholder</h3>
        <p>This is where question description will appear for question ID {id}.</p>
      </div>

      <div className="code-editor-placeholder">
        <i className="fas fa-code"></i> Code Editor will be shown here.
      </div>

      <button className="submit-button">
        <i className="fas fa-paper-plane"></i> Submit Code
      </button>
    </div>
  );
}
