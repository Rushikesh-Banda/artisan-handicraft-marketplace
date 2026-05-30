import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtisanProfile } from '../api/artisanApi';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

const ArtisanProfile = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    getArtisanProfile(id).then(data => setArtisan(data)).catch(console.error);
  }, [id]);

  if (!artisan) return <Loader />;

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
          {artisan.storeName}
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          {artisan.bio}
        </p>
      </div>

      <h3 style={{ marginBottom: '2rem' }}>Products by {artisan.storeName}</h3>
      <div className="products-grid">
        {/* Render products once backend link provides artisan's products */}
        <p style={{ color: 'var(--text-secondary)' }}>More products coming soon...</p>
      </div>
    </div>
  );
};

export default ArtisanProfile;
