
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/navbar.css';
import { useAuth } from '../context/AuthContext';
import SettingsIcon from './SettingsIcon';


export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">madcrts</h1>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/cart"><FaShoppingCart /></Link>
          <Link to="/design-preview">Design</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="auth-links">
          {!user ? (
            <>
           
              <Link to="/Login">Login</Link>
              <Link to="/Register">Register</Link>
             

            
            </>
          ) : (
            <SettingsIcon />
          )}
        </div>
      </div>
    </nav>
  );
}
