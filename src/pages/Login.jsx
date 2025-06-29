// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import './Login.css'; 

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleRedirect = (role) => {
    setMessage("Login successful! Redirecting...");
    setTimeout(() => {
      if (role === "customer") {
        navigate("/products");
      } else if (role === "driver") {
        navigate("/driver");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      } else {
        setMessage("Unknown role. Please contact support.");
      }
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://127.0.0.1:5555/api/auth/login", formData);
      const { access_token } = res.data;

      login(access_token);

      const decoded = JSON.parse(atob(access_token.split('.')[1]));
      const role = decoded?.role; 

      if (!role) throw new Error("Role missing in token.");

      handleRedirect(role);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`login-button ${isSubmitting ? "disabled" : ""}`}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>

        {message && (
          <p
            className={`login-message ${
              message.toLowerCase().includes("success")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
