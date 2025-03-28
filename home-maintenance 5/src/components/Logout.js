import React from 'react';
import Navbar from './Navbar'; // Ensure Navbar is imported
import Footer from './Footer'; // Ensure Footer is imported
import '../index.css';

const Logout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="mt-5">You have successfully logged out.</h1>
        <p className="mt-3">
          Thank you for using MaintainEase. We hope to see you again soon!
        </p>
        <a href="/" className="btn btn-primary mt-4">Return to Home</a>
      </div>
      <Footer />
    </div>
  );
};

export default Logout;
