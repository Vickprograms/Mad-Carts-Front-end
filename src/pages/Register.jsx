import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleRedirect = (role) => {
    e.preventDefault()
    setIsRedirecting(true);
    setMessage("Registration successful! Redirecting...");

    setTimeout(() => {
      if (role === "customer") {
        window.location.href = "http://localhost:3000/";
      } else if (role === "driver") {
        navigate("/driver");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        setMessage("Unknown role. Contact support.");
      }
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Register user
      await axios.post("http://127.0.0.1:5555/api/auth/register", formData);

      // Login user
      const loginRes = await axios.post("http://127.0.0.1:5555/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { access_token } = loginRes.data;
      login(access_token); // save in AuthContext

      const decoded = JSON.parse(atob(access_token.split(".")[1]));
      const role = decoded?.sub?.role;
      handleRedirect(role);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed.");
      setIsSubmitting(false); // Allow retry
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        {["email", "username", "password", "phone_no"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="block w-full p-2 mb-4 border rounded"
            required
          />
        ))}

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        >
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting || isRedirecting}
          className={`py-2 px-4 rounded w-full text-white ${
            isRedirecting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isRedirecting ? "Redirecting..." : isSubmitting ? "Submitting..." : "Register"}
        </button>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
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
