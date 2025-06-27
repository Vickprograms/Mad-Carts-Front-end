import React from "react";
import Navbar from "../components/Navbar";

const DashboardCustomer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <main className="p-6">
        <header className="bg-white shadow p-4 rounded-xl mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Customer Dashboard</h1>
        </header>
        <section className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-700 mb-4">
            Welcome! Here you can browse products, manage your cart, and track your orders.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Browse Products
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardCustomer;
