import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

