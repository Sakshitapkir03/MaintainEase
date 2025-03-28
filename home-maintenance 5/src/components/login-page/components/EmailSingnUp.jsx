import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../lib/firebase.ts";
import { toast } from "react-hot-toast";

export default function EmailSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignUp = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email || !password) {
      if (!email) setEmailError("Email is required.");
      if (!password) setPasswordError("Password is required.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      toast.success("Sign-up successful! Check your email to verify your account.");
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      console.error("Sign-Up Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const errorStyle = {
    border: "1px solid red",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "5px",
    fontSize: "14px",
  };

  const errorMessageStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "6px",
    marginLeft: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#cccccc",
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Sign Up</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ ...inputStyle, ...(emailError ? errorStyle : {}) }}
      />
      {emailError && <p style={errorMessageStyle}>{emailError}</p>}
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ ...inputStyle, ...(passwordError ? errorStyle : {}) }}
      />
      {passwordError && <p style={errorMessageStyle}>{passwordError}</p>}
      <button
        onClick={handleSignUp}
        disabled={loading}
        style={loading ? buttonDisabledStyle : buttonStyle}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </div>
  );
}