import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardCustomer from './pages/DashboardCustomer';
import DashboardDriver from './pages/DashboardDriver';
import Unauthorized from './pages/Unauthorized';
import CartPage from './pages/CartPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

import ProductManager from './components/ProductManager';
import MainApp from './components/MainApp';

import './App.css';

function App() {
  return (
    <>
      <Navbar />

      {/* Optional: Add a basic nav for product manager (or remove if Navbar already covers it) */}
      <nav id="nav-bar">
        <Link to="/">Main App</Link>
        <Link to="/ProductManager">Product Manager</Link>
      </nav>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Cart and Orders */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />

        {/* Dashboards (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <DashboardCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DashboardDriver />
            </ProtectedRoute>
          }
        />

        {/* Product Management UI */}
        <Route path="/ProductManager" element={<ProductManager />} />
        <Route path="/main" element={<MainApp />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
