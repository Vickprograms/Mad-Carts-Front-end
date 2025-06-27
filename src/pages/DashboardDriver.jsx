import React from "react";
import Navbar from "../components/Navbar";

const DashboardDriver = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <main className="p-6">
        <header className="bg-white shadow p-4 rounded-xl mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Driver Dashboard</h1>
        </header>
        <section className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-700 mb-4">
            Welcome! Here you can view and manage delivery tasks assigned to you.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            View Deliveries
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardDriver;
