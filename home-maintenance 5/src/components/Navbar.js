
// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../index.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Navbar toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/services" className="nav-link navbar-link" onClick={closeNavbar}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link navbar-link" onClick={closeNavbar}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link navbar-link" onClick={closeNavbar}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link navbar-link" onClick={closeNavbar}>
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link navbar-link" onClick={closeNavbar}>
                Log Out
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chatbot" className="nav-link navbar-link" onClick={closeNavbar}>
                Chatbot
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
