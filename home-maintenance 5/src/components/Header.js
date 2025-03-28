// Header.js
import React from 'react';
import '../index.css';

// export default Header;
function Header() {
  return (
    <header className="header-container">
      <div className="logo-container">
        <img 
          src={`${process.env.PUBLIC_URL}/WhatsApp Image 2024-10-10 at 11.18.10 AM.jpeg`} // Replace with your logo path
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="header-details">
        <h1 className="header-title">MaintainEase</h1>
        <p className="header-description">
          Providing top-notch services since 2024. Your satisfaction is our priority.
        </p>
      </div>
    </header>
  );
}