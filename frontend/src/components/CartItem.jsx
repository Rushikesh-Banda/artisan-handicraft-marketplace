import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const { product, quantity } = item;

  const handleIncrement = () => {
    if (quantity < product.countInStock) {
      updateQuantity(product._id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product._id, quantity - 1);
    }
  };

  return (
    <div 
      className="glass-card" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '1.5rem', 
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Link to={`/product/${product._id}`} style={{ flexShrink: 0 }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '12px', 
            objectFit: 'cover',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }} 
        />
      </Link>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link to={`/product/${product._id}`}>
          <h4 style={{ 
            margin: 0, 
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            transition: 'color 0.2s ease'
          }}>
            {product.title}
          </h4>
        </Link>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Seller: {product.seller?.name || 'Artisan'}
        </p>
        <p style={{ 
          color: 'var(--primary-color)', 
          fontWeight: 'bold', 
          margin: 0,
          fontSize: '1.2rem'
        }}>
          ₹{product.price}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Quantity Controls */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button 
            onClick={handleDecrement}
            disabled={quantity <= 1}
            style={{ 
              background: 'transparent',
              border: 'none',
              color: quantity <= 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
              padding: '0.5rem 1rem',
              cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '1.2rem',
              opacity: quantity <= 1 ? 0.5 : 1
            }}
          >
            -
          </button>
          
          <span style={{ 
            minWidth: '2rem', 
            textAlign: 'center', 
            fontWeight: 'bold' 
          }}>
            {quantity}
          </span>
          
          <button 
            onClick={handleIncrement}
            disabled={quantity >= product.countInStock}
            style={{ 
              background: 'transparent',
              border: 'none',
              color: quantity >= product.countInStock ? 'var(--text-secondary)' : 'var(--text-primary)',
              padding: '0.5rem 1rem',
              cursor: quantity >= product.countInStock ? 'not-allowed' : 'pointer',
              fontSize: '1.2rem',
              opacity: quantity >= product.countInStock ? 0.5 : 1
            }}
          >
            +
          </button>
        </div>

        <div style={{ textAlign: 'right', minWidth: '80px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>
            ₹{(product.price * quantity).toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <motion.button 
          whileHover={{ scale: 1.1, color: '#ef4444' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => removeFromCart(product._id)}
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)',
            border: 'none', 
            color: 'var(--text-secondary)', 
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem', 
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          title="Remove item"
        >
          🗑️
        </motion.button>
      </div>
    </div>
  );
};

export default CartItem;
