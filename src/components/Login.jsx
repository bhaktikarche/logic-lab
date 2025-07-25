import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Login failed';
      toast.error(errorMsg);
      console.error('Login error:', err);
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
        
        <h2><i className="fas fa-sign-in-alt"></i> Welcome Back</h2>
        
        <form className="auth-form" onSubmit={handleLogin}>
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
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
          </button>
        </form>
        
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
          <br/>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
}