// src/Routes.jsx
import { Routes, Route } from "react-router-dom";

// Common Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Customer Pages
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import DashboardCustomer from "./pages/DashboardCustomer";

// Admin Pages
import DashboardAdmin from "./pages/DashboardAdmin";
import ProductManager from "./components/ProductManager";

// Driver Pages
import DashboardDriver from "./pages/DashboardDriver";
import Deliveries from "./pages/Deliveries";

// Misc/Shared
import DesignPreview from "./pages/DesignPreview";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/dashboard/customer" element={<DashboardCustomer />} />

      {/* Admin Routes */}
      <Route path="/dashboard/admin" element={<DashboardAdmin />} />
      <Route path="/product-manager" element={<ProductManager />} />

      {/* Driver Routes */}
      <Route path="/driver" element={<DashboardDriver />} />
      <Route path="/deliveries" element={<Deliveries />} />

      {/* Shared/Misc */}
      <Route path="/design-preview" element={<DesignPreview />} />
    </Routes>
  );
}
