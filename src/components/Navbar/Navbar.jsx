import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/">
                        🛒 ShopCart
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <Link 
                        to="/cart" 
                        className={`navbar-link ${location.pathname === '/cart' ? 'active' : ''}`}
                    >
                        🛍️ Cart
                    </Link>
                </div>

                {/* User Section */}
                <div className="navbar-user">
                    <div className="user-info">
                        👤 User
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;