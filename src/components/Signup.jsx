import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Signup() {
  return (
    <div className="auth-container">
      <h2><i className="fas fa-user-plus"></i> Signup</h2>
      <form className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}
