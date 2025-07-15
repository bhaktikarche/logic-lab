import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="back-home">
        <i className="fas fa-home"></i> Back to Dashboard
      </Link>
    </div>
  );
}
