import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import DesignPreview from "./pages/DesignPreview";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductManager from "./components/ProductManager";
import CartPage from './pages/CartPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import DashboardDriver from './pages/DashboardDriver'
import DashboardAdmin from './pages/DashboardAdmin'
import Deliveries from './pages/Deliveries'
import AdminUsers from './pages/AdminUsers'
import AdminProducts from './pages/AdminProducts'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path = '/cart' element ={<CartPage/>}/>
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/design-preview" element={<DesignPreview />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path ="/product-manager" element = {<ProductManager/>}/>
      <Route path="/orders" element={<OrderDetailsPage />} />
      <Route path="/driver" element={<DashboardDriver />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/deliveries" element={<Deliveries />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/products" element={<AdminProducts />} />
    </Routes>
  );
}
