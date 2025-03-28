import React, { useState } from 'react';
import './index.css'; // Import Sign Up CSS

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Handle sign-up logic here, e.g., send data to the server
      alert(`Account created for ${email}`); // Example feedback
      onSignUp(); // Call parent function to handle successful sign-up
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Sign Up</button>
          <div className="text-muted">
            Already have an account? <a href="#" onClick={() => setIsSignUp(false)}>Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default signUp;
