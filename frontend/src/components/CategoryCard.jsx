import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${category._id}`} style={{ display: 'block' }}>
      <div 
        className="glass-card" 
        style={{ 
          padding: '2rem 1.5rem', 
          textAlign: 'center',
          background: 'linear-gradient(to bottom right, var(--surface-color), var(--bg-color))'
        }}
      >
        <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
