import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./pages/CartPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/cart" replace />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
