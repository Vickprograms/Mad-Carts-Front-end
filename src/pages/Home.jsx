import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Mad-Carts</h1>
      <p className="text-lg text-gray-600 mb-8">Choose your role to access the dashboard:</p>

      <div className="space-y-4 w-full max-w-sm">
        <Link
          to="/customer"
          className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow"
        >
          Customer Dashboard
        </Link>
        <Link
          to="/driver"
          className="block text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow"
        >
          Driver Dashboard
        </Link>
        <Link
          to="/admin"
          className="block text-center bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg shadow"
        >
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
