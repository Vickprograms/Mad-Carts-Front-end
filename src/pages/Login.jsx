import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      const res = await axios.post("http://127.0.0.1:5555/api/auth/login", formData);
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
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      className="block w-full p-2 mb-4 border rounded"
      required
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="block w-full p-2 mb-4 border rounded"
      required
    />

    <button
      type="submit"
      disabled={isSubmitting}
      className={`py-2 px-4 rounded w-full text-white ${
        isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {isSubmitting ? "Submitting..." : "Login"}
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

export default Login;