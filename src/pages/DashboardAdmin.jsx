import React from "react";
import Navbar from "../components/Navbar";

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <main className="p-6">
        <header className="bg-white shadow p-4 rounded-xl mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </header>
        <section className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-700 mb-4">
            Welcome! Manage users, products, and oversee platform activity here.
          </p>
          <div className="flex space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Manage Users
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Manage Products
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdmin;
