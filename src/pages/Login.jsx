import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { setAuthData } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRedirect = (role) => {
    setIsRedirecting(true);
    setMessage("Login successful! Redirecting...");

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
      const res = await axios.post("http://localhost:5000/auth/login", formData);
      const { access_token, user } = res.data;

      setAuthData({ token: access_token, user });
      handleRedirect(user.role);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          disabled={isRedirecting}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
        >
          {isRedirecting ? "Redirecting..." : "Login"}
        </button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
