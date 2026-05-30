import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="container" style={{padding: '2rem'}}>Please log in.</div>;

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h2>Dashboard</h2>
      <div style={{ marginTop: '2rem' }}>
        <p>Welcome back, {user.name}!</p>
        <p>Your current role is: <strong style={{ color: 'var(--primary-color)' }}>{user.role}</strong></p>
        
        {user.role === 'artisan' && (
          <div className="glass-card" style={{ padding: '1.5rem', marginTop: '2rem', maxWidth: '400px' }}>
            <h3>Artisan Quick Actions</h3>
            <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>&rarr; Add New Product</li>
              <li>&rarr; View My Products</li>
              <li>&rarr; Manage Orders</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
