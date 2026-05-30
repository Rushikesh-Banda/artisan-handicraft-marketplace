import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, cartLoading } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const totalPrice = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0).toFixed(2) : '0.00';

  if (cartLoading && (!cart.items || cart.items.length === 0)) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 'bold' }}
      >
        Your Shopping Cart
      </motion.h2>

      {!cart.items || cart.items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{ 
            padding: '4rem 2rem', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <div style={{ fontSize: '4rem', opacity: 0.5 }}>🛒</div>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>Your cart is empty</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Looks like you haven't added any handcrafted items to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.8rem 2rem' }}>
            Explore Handcrafts
          </Link>
        </motion.div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.items.map((item, index) => (
              <motion.div
                key={item.product._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CartItem item={item} />
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card sticky-summary" 
            style={{ 
              padding: '2rem',
              position: 'sticky',
              top: '100px'
            }}
          >
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Items ({totalItems})</span>
              <span>₹{totalPrice}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <hr style={{ borderColor: 'var(--border-color)', margin: '1.5rem 0', opacity: 0.3 }} />
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontWeight: 'bold', 
              fontSize: '1.5rem',
              color: 'var(--primary-color)',
              marginBottom: '2rem'
            }}>
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checkout')}
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Proceed to Checkout
            </motion.button>
            
            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <p>Secure checkout powered by Stripe</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
