import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(''); // For sign-up
  const [signupEmail, setSignupEmail] = useState(''); // For sign-up
  const [signupPassword, setSignupPassword] = useState(''); // For sign-up

  // Hardcoded credentials
  const HARD_CODED_EMAIL = 'test@gmail.com';
  const HARD_CODED_PASSWORD = 'password';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Check for hardcoded credentials
    if (email === HARD_CODED_EMAIL && password === HARD_CODED_PASSWORD) {
      alert(`Welcome back!`);
      onLogin(); // Call to update authentication status
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Implement sign-up logic (e.g., API call)
    alert(`Welcome, ${name}! You have signed up successfully.`);
    onLogin(); // Call onLogin to update authentication status
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2 className="text-center">{isSignUp ? 'Create Your Account' : 'Sign In'}</h2>
        {isSignUp ? (
          <form onSubmit={handleSignUpSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name (required)</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signupEmail" className="form-label">Email Address (required)</label>
              <input
                type="email"
                className="form-control"
                id="signupEmail"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signupPassword" className="form-label">Password (required)</label>
              <input
                type="password"
                className="form-control"
                id="signupPassword"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            <p className="text-center mt-3">
              Already have an account? <a href="#" onClick={() => setIsSignUp(false)}>Sign In</a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address (required)</label>
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
              <label htmlFor="password" className="form-label">Password (required)</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            <p className="text-center mt-3">
              Don't have an account? <a href="#" onClick={() => setIsSignUp(true)}>Sign Up</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
