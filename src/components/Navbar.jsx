import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
    <h1 className="text-xl font-semibold text-gray-800">Mad-Carts</h1>
    <div>
      <Link
        to="/"
        className="text-blue-600 hover:underline font-medium text-sm"
      >
        Logout
      </Link>
    </div>
  </nav>
);

export default Navbar;
