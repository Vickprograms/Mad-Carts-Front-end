// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone_no: "",
    role: "customer",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  // ✅ Fix: make sure handleChange is defined
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleRedirect = (role) => {
    setIsRedirecting(true);
    setMessage("Registration successful! Redirecting...");
    setTimeout(() => {
      if (role === "customer") {
        navigate("/dashboard/customer");
      } else if (role === "driver") {
        navigate("/driver");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      } else {
        setMessage("Unknown role. Contact support.");
      }
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Register the user
      await axios.post("http://127.0.0.1:5555/api/auth/register", formData);

      // Then log them in immediately
      const loginRes = await axios.post("http://127.0.0.1:5555/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { access_token } = loginRes.data;
      login(access_token);

      const decoded = JSON.parse(atob(access_token.split(".")[1]));
      const role = decoded?.sub?.role;

      handleRedirect(role);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">
        <h2 className="register-title">Register</h2>

        {/* Dynamic input fields for email, username, password, phone_no */}
        {["email", "username", "password", "phone_no"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
            value={formData[field]}
            onChange={handleChange}
            className="register-input"
            required
          />
        ))}

        {/* Role selection */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="register-input"
          required
        >
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || isRedirecting}
          className={`register-button ${isRedirecting ? "disabled" : ""}`}
        >
          {isRedirecting
            ? "Redirecting..."
            : isSubmitting
            ? "Submitting..."
            : "Register"}
        </button>

        {/* Message display */}
        {message && (
          <p
            className={`register-message ${
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

export default Register;
