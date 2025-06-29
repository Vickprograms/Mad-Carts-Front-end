import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const DashboardDriver = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Driver Dashboard</h1>
        <div className="dashboard-section">
          <p>
            Welcome! Here you can view and manage delivery tasks assigned to you.
          </p>
          <button 
            className="dashboard-btn"
            onClick={() => navigate('/deliveries')}
          >
            View Deliveries
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardDriver;
