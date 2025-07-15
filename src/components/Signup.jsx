import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Auth.css';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: fullName,
        email,
        password,
      });

      toast.success('Account created successfully!');
      navigate('/'); // redirect to login page
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2><i className="fas fa-user-plus"></i> Signup</h2>
      
      <form className="auth-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}
