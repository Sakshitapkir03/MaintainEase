import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "15px 30px",
    margin: "10px",
    fontSize: "18px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  };

  const adminButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007BFF",
  };

  const customerButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28A745",
  };

  const handleAdminSignIn = () => {
    navigate("/admin");
  };

  const handleCustomerSignIn = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "68vh",
        zIndex :40
      }}
    >
      <h1 style={{ marginBottom: "20px", fontFamily: "Arial, sans-serif", color: "#fff" ,fontWeight:"800", textShadow:"3px"}}>
        Welcome! Please Select an Option
      </h1>
      <div>
        <button style={adminButtonStyle} onClick={handleAdminSignIn}>
          Sign in as Admin
        </button>
        <button style={customerButtonStyle} onClick={handleCustomerSignIn}>
          Sign in as Customer
        </button>
      </div>
    </div>
  );
};

const AdminPage = () => <h2>Welcome to the Admin Page</h2>;



export default HomePage;
