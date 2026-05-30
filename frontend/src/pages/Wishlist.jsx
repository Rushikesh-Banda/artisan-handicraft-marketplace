import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h2>My Wishlist</h2>
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Your wishlist is currently empty.</p>
        <Link to="/products" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Discover Items
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
