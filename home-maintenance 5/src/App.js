import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";
import ServiceDetails from "./components/ServiceDetails";
import RequestEstimate from "./components/RequestEstimate";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/Faq";
import RequestNewEstimate from "./components/newEstimate";
import AdminDashboard from "./components/admin_d";
import HomePage from "./components/HomePage";
import AdminLogin from "./components/AdminLogin"
import AuthLogin from "./components/login-page/AuthLogin.tsx"
import EmailSignUp from "./components/login-page/components/EmailSingnUp.jsx"
import ForgotPassword from "./components/login-page/components/ForgotPassword.jsx"
import Chat from './Chat.js'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <div className="app">
        <div className={`content ${!isAuthenticated ? "blur" : ""}`}>
          <Navbar />
          <Routes>
            <Route path="/services" element={<ServicesSection />} />
            <Route path="/services/:category/:feature" element={<ServiceDetails />} />
            <Route path="/request-estimate/:category/:feature" element={<RequestNewEstimate />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/signup" element={<EmailSignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/chatbot" element={<Chat />} /> 
          </Routes>
          <Footer />
        </div>
        {/* {!isAuthenticated && <Login onLogin={handleLogin} />} */}
      </div>
    </Router>
  );
}

export default App;
