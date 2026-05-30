import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App.jsx';

import './styles/global.css';

import { Toaster }
from 'react-hot-toast';

import {
  AuthProvider
} from './context/AuthContext';

import {
  CartProvider
} from './context/CartContext';


ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <AuthProvider>

      <CartProvider>

        <App />

        {/* TOAST NOTIFICATIONS */}
        <Toaster

          position="top-right"

          toastOptions={{

            style: {

              background: '#1e293b',

              color: '#fff',

              border:
                '1px solid #6366f1',

              padding: '16px',

              borderRadius: '12px',
            },

            success: {
              duration: 2000,
            },

            error: {
              duration: 2000,
            },
          }}
        />

      </CartProvider>

    </AuthProvider>

  </React.StrictMode>
);