import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SettingsIcon from './SettingsIcon';
import '../styles/navbar.css';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center py-4 px-6">
        <h1 className="logo text-2xl font-bold">madcrts</h1>

        <div className="nav-links flex gap-4">
          <Link to="/products" className="hover:text-blue-500">Products</Link>
          <Link to="/cart" className="hover:text-blue-500 flex items-center gap-1">
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/design-preview" className="hover:text-blue-500">Design</Link>
          <Link to="/about" className="hover:text-blue-500">About Us</Link>
        </div>

        <div className="auth-links flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="hover:text-blue-600">Register</Link>
            </>
          ) : (
            <SettingsIcon />
          )}
        </div>
      </div>
    </nav>
  );
}
