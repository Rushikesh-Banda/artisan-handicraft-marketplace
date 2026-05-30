import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    
    if (!localStorage.getItem("user")) {
      alert("Please login first to add products to your cart.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      await addToCart(product._id, 1);
    } finally {
      setLoading(false);
    }
  };


  return (

    <motion.div
      className="glass-card product-card"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layout
    >

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        />
      </Link>


      {/* Product Content */}
      <div style={{ padding: '1.25rem' }}>

        <Link to={`/product/${product._id}`}>
          <h3
            className="product-title"
            style={{
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.title}
          </h3>
        </Link>


        {/* PRICE + RATING */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <p
            style={{
              color: 'var(--primary-color)',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              margin: 0,
            }}
          >
            ₹{product.price}
          </p>

          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            ★ {product.rating || 0}
          </span>
        </div>


        {/* Stock indicator */}
        {product.countInStock <= 0 && (
          <p style={{
            color: '#ef4444',
            fontSize: '0.8rem',
            marginBottom: '0.5rem',
          }}>
            Out of Stock
          </p>
        )}


        {/* ADD TO CART BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          type="button"
          disabled={loading || product.countInStock <= 0}
          onClick={handleAddToCart}
          className="btn btn-primary"
          style={{
            width: '100%',
            opacity: product.countInStock <= 0 ? 0.5 : 1,
            cursor: product.countInStock <= 0 ? 'not-allowed' : 'pointer',
          }}
        >
          {loading
            ? 'Adding...'
            : product.countInStock <= 0
              ? 'Out of Stock'
              : 'Add To Cart'}
        </motion.button>

      </div>

    </motion.div>
  );
};

export default ProductCard;