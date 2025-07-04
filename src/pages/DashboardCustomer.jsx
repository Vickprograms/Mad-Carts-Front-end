// src/pages/DashboardDriver.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DashboardDriver.css";

const DashboardDriver = () => {
  const navigate = useNavigate();

  const handleViewDeliveries = () => {
    navigate("/deliveries");
  };

  return (
    <div className="driver-dashboard-container">
      <Navbar />
      <main className="driver-main">
        <header className="driver-header">
          <h1 className="driver-title">Driver Dashboard</h1>
          <p className="driver-subtext">
            Welcome back! View and manage your assigned deliveries.
          </p>
        </header>

        <section className="driver-section">
          <p className="driver-description">
            Check your delivery assignments or update delivery statuses.
          </p>
          <button className="driver-button" onClick={handleViewDeliveries}>
            View Deliveries
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardDriver;
