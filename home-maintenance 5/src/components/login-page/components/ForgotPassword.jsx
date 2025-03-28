import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase.ts";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      toast.error("Failed to send reset email. Ensure the email is registered.");
      console.error("Error sending reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
      />
      <button onClick={handlePasswordReset} disabled={loading} className="reset-button">
        {loading ? "Sending..." : "Reset Password"}
      </button>
    </div>
  );
}
