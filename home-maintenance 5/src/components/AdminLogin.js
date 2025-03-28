import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/api/login", { email, password });
      if (response.data.message === "Login successful") {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",zIndex : 40 }}>
      <form
        onSubmit={handleLogin}
        style={{
          padding: "20px !important",
          border: "1px solid #ccc !important",
          borderRadius: "8px !important",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1) !important",
          zIndex : 40
        }}
      >
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100% !important",
              padding: "8px !important",
              marginTop: "5px !important",
              borderRadius: "4px !important",
              border: "1px solid #ccc !important",
              zIndex : 40
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100% !important",
              padding: "8px !important",
              marginTop: "5px !important",
              borderRadius: "4px !important",
              border: "1px solid #ccc !important",
              zIndex : 40,
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "6px",
              backgroundColor:" #f9f9f9",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px !important",
            backgroundColor: "#007BFF !important",
            color: "#fff !important",
            border: "none !important",
            borderRadius: "4px !important",
            cursor: "pointer !important",
            zIndex : 40
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
