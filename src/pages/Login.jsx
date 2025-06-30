import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/auth.css";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      if (user.role === "customer") {
        navigate("/");
      } else if (user.role === "driver") {
        navigate("/driver");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      const { access_token, user } = res.data;

      const role = user?.role;
      if (!role) {
        throw new Error("Role missing in user data.");
      }

      login(access_token);

      if (role === "customer") {
        navigate("/");
      } else if (role === "driver") {
        navigate("/driver");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        setMessage("Unknown role. Please contact support.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
      setIsSubmitting(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="email" className="auth-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="auth-button"
          >
            {isSubmitting ? (
              <div className="auth-loading">
                <div className="auth-spinner"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          {message && (
            <div className={`auth-message ${message.toLowerCase().includes("success") ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
