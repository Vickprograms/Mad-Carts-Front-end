// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone_no: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRedirect = (role) => {
    setIsRedirecting(true);
    setMessage("Registration successful! Redirecting...");

    setTimeout(() => {
      if (role === "customer") {
        window.location.href = "http://localhost:3000/";
      } else if (role === "driver") {
        navigate("/driver");
      } else if (role === "admin") {
        navigate("/admin");
      }
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5555/api/auth/register", formData);
      handleRedirect(formData.role);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {["email", "username", "password", "phone_no"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="block w-full p-2 mb-4 border rounded"
          />
        ))}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        >
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          disabled={isRedirecting}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          {isRedirecting ? "Redirecting..." : "Register"}
        </button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
