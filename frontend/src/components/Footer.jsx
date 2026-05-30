import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 0', marginTop: 'auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ArtisanMarket. All rights reserved.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Empowering independent creators worldwide.</p>
      </div>
    </footer>
  );
};

export default Footer;
