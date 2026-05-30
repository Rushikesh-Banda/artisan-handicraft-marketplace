import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../api/orderApi';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(data => {
      setOrders(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>You have no orders yet.</p>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          {orders.map(order => (
            <div key={order._id} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>${order.totalPrice.toFixed(2)}</p>
                <p style={{ color: order.isPaid ? '#22c55e' : '#ef4444' }}>
                  {order.isPaid ? 'Paid' : 'Not Paid'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
