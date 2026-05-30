const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');

const connectDB = require('./config/db');
const initSocketServer = require('./sockets/socketServer');

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

// Initialize Express App
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
initSocketServer(server);

// ======================
// Global Middlewares
// ======================

// Security Middleware
app.use(helmet());

// CORS Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Development Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ======================
// API Routes
// ======================

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/artisans', require('./routes/artisanRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(
  '/api/seller',
  require('./routes/sellerRoutes')
);

// ======================
// Health Check Route
// ======================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Artisan Marketplace API Running',
  });
});

// ======================
// 404 Middleware
// ======================

app.use((req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// ======================
// Global Error Handler
// ======================

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});