import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

export default function SettingsIcon() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen((prev) => !prev);

  if (!user) return null;

  return (
    <div className="relative">
      <FaCog
        onClick={toggleDropdown}
        className="text-2xl cursor-pointer hover:text-gray-600"
      />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
          <div className="flex flex-col p-2 text-sm">
            {user.role === 'admin' ? (
              <>
                <Link to="/product-manager" className="hover:bg-gray-100 p-2 rounded">Product Manager</Link>
                <Link to="/admin-dashboard" className="hover:bg-gray-100 p-2 rounded">Admin Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="hover:bg-gray-100 p-2 rounded">My Profile</Link>
                <Link to="/orders" className="hover:bg-gray-100 p-2 rounded">My Orders</Link>
              </>
            )}
            <button
              onClick={logout}
              className="text-left p-2 mt-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
