import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

export default function SettingsIcon() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(prev => !prev);

  if (!user) return null;

  const styles = {
    icon: {
      fontSize: '1.5rem',
      color: '#FFD700',
      cursor: 'pointer',
    },
    dropdown: {
      position: 'absolute',
      right: 0,
      marginTop: '0.5rem',
      width: '12rem',
      backgroundColor: '#1C1F26',
      border: '1px solid #2A2C34',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
      zIndex: 50,
    },
    item: {
      padding: '0.5rem 1rem',
      color: '#F5F5F5',
      textDecoration: 'none',
      fontSize: '0.9rem',
      display: 'block',
    },
    itemHover: {
      backgroundColor: '#2A2C34',
    },
    logout: {
      padding: '0.5rem 1rem',
      color: '#FF4D4F',
      backgroundColor: '#1C1F26',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      fontSize: '0.9rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <FaCog onClick={toggleDropdown} style={styles.icon} />
      {open && (
        <div style={styles.dropdown}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {user.role === 'admin' ? (
              <>
                <Link to="/product-manager" style={styles.item}>Product Manager</Link>
                <Link to="/admin-dashboard" style={styles.item}>Admin Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/profile" style={styles.item}>My Profile</Link>
                <Link to="/orders" style={styles.item}>My Orders</Link>
              </>
            )}
            <button onClick={logout} style={styles.logout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
