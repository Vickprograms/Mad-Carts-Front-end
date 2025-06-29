import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-section">
          <p>
            Welcome! Manage users, products, and oversee platform activity here.
          </p>
          <div className="flex space-x-4 mt-4">
            <button className="dashboard-btn" onClick={() => navigate('/admin/users')}>
              Manage Users
            </button>
            <button className="dashboard-btn" onClick={() => navigate('/admin/products')}>
              Manage Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
