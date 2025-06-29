// src/pages/AdminDashboard.jsx
import React from "react";
import { useOrders } from "../hooks/useOrders";
import "./DashboardAdmin.css";

const AdminDashboard = () => {
  const {
    orders,
    loading,
    error,
    getStatusColor,
    getStatusIcon,
    getTotalItems,
    updateOrder
  } = useOrders();

  const handleMarkAsShipped = async (order) => {
    try {
      await updateOrder({ ...order, status: "Shipped" });
      alert(`Order #${order.id} marked as shipped.`);
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="admin-error">{error}</p>}

      <div className="order-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h2 className="order-id">Order #{order.id}</h2>
              <span className={`order-status ${getStatusColor(order.status)}`}>
                Status: {order.status}
              </span>
            </div>

            <div className="order-summary">
              {getStatusIcon(order.status)} {getTotalItems(order)} item(s)
            </div>

            <p className="order-text">Customer: {order.customer_name || "N/A"}</p>
            <p className="order-text">Address: {order.address || "N/A"}</p>

            {order.status?.toLowerCase() === "pending" && (
              <button
                onClick={() => handleMarkAsShipped(order)}
                className="ship-button"
              >
                Mark as Shipped
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
