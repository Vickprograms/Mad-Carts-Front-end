import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SettingsIcon from './SettingsIcon';

export default function Navbar() {
  const { user } = useAuth();

  const styles = {
    navbar: {
      backgroundColor: '#0B0C10',
      borderBottom: '1px solid #2A2C34',
      color: '#F5F5F5',
      padding: '1rem 1.5rem',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1280px',
      margin: '0 auto',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#FFD700',
    },
    navLinks: {
      display: 'flex',
      gap: '1.5rem',
    },
    link: {
      color: '#F5F5F5',
      textDecoration: 'none',
      fontWeight: '500',
    },
    linkHover: {
      color: '#FFAA00',
    },
    authLinks: {
      display: 'flex',
      gap: '1rem',
    },
    authButton: {
      padding: '0.5rem 1rem',
      border: '1px solid #2A2C34',
      borderRadius: '5px',
      textDecoration: 'none',
      color: '#F5F5F5',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h1 style={styles.logo}>madcrts</h1>

        <div style={styles.navLinks}>
          <Link to="/products" style={styles.link}>Products</Link>
          <Link to="/cart" style={{ ...styles.link, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/design-preview" style={styles.link}>Design</Link>
          <Link to="/about" style={styles.link}>About Us</Link>
        </div>

        <div style={styles.authLinks}>
          {!user ? (
            <>
              <Link to="/login" style={styles.authButton}>Login</Link>
              <Link to="/register" style={styles.authButton}>Register</Link>
            </>
          ) : (
            <SettingsIcon />
          )}
        </div>
      </div>
    </nav>
  );
}
