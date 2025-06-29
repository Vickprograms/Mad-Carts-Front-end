// src/pages/DashboardCustomer.jsx
import React from "react";
import Navbar from "../components/Navbar";
import "./DashboardCustomer.css"; // Import the CSS file

const DashboardCustomer = () => {
  return (
    <div className="customer-dashboard-container">
      <Navbar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Customer Dashboard</h1>
        </header>

        <section className="dashboard-section">
          <p className="dashboard-description">
            Welcome! Here you can browse products, manage your cart, and track your orders.
          </p>

          <button
            className="dashboard-button"
            onClick={() => (window.location.href = "/products")}
          >
            Browse Products
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardCustomer;
