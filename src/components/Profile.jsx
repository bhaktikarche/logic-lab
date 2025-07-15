import React from 'react';

export default function Profile() {
  const user = localStorage.getItem('user');

  return (
    <div className="profile-container">
      <h2><i className="fas fa-user-circle"></i> Profile</h2>
      <p><strong>Email:</strong> {user}</p>
      <p><strong>Account Type:</strong> Student</p>

    
    </div>
  );
}
