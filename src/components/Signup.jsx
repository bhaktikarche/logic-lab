import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Auth.css';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName || !email || !password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: fullName,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Signup failed';
      toast.error(errorMsg);
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="video-background">
        <source src="/assets/login.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="auth-overlay"></div>
      
      <div className="auth-container">
        <div className="logo">
          <i className="fas fa-code"></i> LogicLab
        </div>
        
        <h2><i className="fas fa-user-plus"></i> Create Account</h2>
        
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Create Account'}
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}