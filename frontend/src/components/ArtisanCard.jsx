import React from 'react';
import { Link } from 'react-router-dom';

const ArtisanCard = ({ artisan }) => {
  return (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
      <div 
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#fff'
        }}
      >
        {artisan.storeName.charAt(0).toUpperCase()}
      </div>
      <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{artisan.storeName}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {artisan.bio.substring(0, 100)}...
      </p>
      <Link to={`/artisan/${artisan.user._id}`} className="btn btn-outline" style={{ width: '100%' }}>
        Visit Store
      </Link>
    </div>
  );
};

export default ArtisanCard;
