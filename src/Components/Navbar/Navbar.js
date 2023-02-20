import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <Link to="/" className="navbar-heading" style={{color: '#007bff', fontStyle: 'italic'}}><h1>MyWeblink</h1></Link>
      <ul className="navbar-list">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/products" className="navbar-link">Products</Link></li>
          <li><Link to="/aboutus" className="navbar-link">About Us</Link></li>
        </ul>
    </div>
    </nav>
  );
}

export default Navbar;
