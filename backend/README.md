# Artisan Handicraft Marketplace Backend

A scalable and production-ready MERN marketplace backend for artisans to sell handcrafted products online.
This backend provides secure authentication, product management, order processing, payment integration, real-time notifications, and cloud-based image uploads.

---

# Features

## Authentication & Authorization

* JWT-based authentication
* Secure password hashing using bcrypt
* Role-based authorization
* Protected routes
* Admin and Artisan access control

---

## Artisan Marketplace Features

* Artisan profile management
* Product creation and management
* Category management
* Product reviews and ratings
* Wishlist system
* Shopping cart functionality
* Order management system

---

## Ecommerce Features

* Secure checkout flow
* Stripe payment integration
* Invoice generation
* Dynamic price calculation
* Stock management
* Order tracking

---

## Real-Time Features

* Socket.IO real-time notifications
* Live order updates
* User-specific socket rooms

---

## File Upload Features

* Cloudinary image upload integration
* Multer middleware
* File validation and image filtering

---

# Technologies Used

## Backend Framework

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose ODM

## Authentication & Security

* JSON Web Token (JWT)
* bcrypt.js

## Real-Time Communication

* Socket.IO

## File Uploads

* Multer
* Cloudinary

## Payments

* Stripe

## Email Services

* Nodemailer

---

# Project Structure

```txt
backend
│
├── config
│   ├── db.js
│   ├── cloudinary.js
│   └── paymentGateway.js
│
├── controllers
│   ├── authController.js
│   ├── artisanController.js
│   ├── productController.js
│   ├── categoryController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── reviewController.js
│   ├── wishlistController.js
│   ├── notificationController.js
│   └── userController.js
│
├── middlewares
│   ├── verifyToken.js
│   ├── roleMiddleware.js
│   └── uploadMiddleware.js
│
├── models
│   ├── User.js
│   ├── Artisan.js
│   ├── Product.js
│   ├── Category.js
│   ├── Cart.js
│   ├── Order.js
│   ├── Review.js
│   ├── Wishlist.js
│   └── Notification.js
│
├── routes
│   ├── authRoutes.js
│   ├── artisanRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── reviewRoutes.js
│   ├── wishlistRoutes.js
│   ├── notificationRoutes.js
│   └── userRoutes.js
│
├── services
│   ├── emailService.js
│   ├── paymentService.js
│   └── notificationService.js
│
├── sockets
│   └── socketServer.js
│
├── utils
│   ├── generateInvoice.js
│   ├── fileUpload.js
│   └── priceCalculator.js
│
├── uploads
│
├── .env
├── package.json
└── server.js
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
NODE_ENV=development

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

FROM_NAME=Artisan Marketplace
FROM_EMAIL=noreply@artisanmarketplace.com
```

---

# Run Development Server

```bash
npm run dev
```

Or:

```bash
node server.js
```

---

# API Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization

---

## Products

* Create Product
* Update Product
* Delete Product
* Product Search
* Product Reviews
* Product Ratings

---

## Orders

* Create Orders
* Payment Processing
* Order Tracking
* Delivery Status Updates
* Invoice Generation

---

## Cart & Wishlist

* Add to Cart
* Remove from Cart
* Wishlist Management

---

## Notifications

* Real-time Notifications
* Order Notifications
* User Notification System

---

# Security Features

* Password Hashing
* JWT Authentication
* Protected Routes
* Role-Based Access Control
* File Validation
* Secure Payment Processing

---

# Real-Time Socket Events

## Socket Events

* join
* sendNotification
* receiveNotification
* disconnect

---

# Payment Integration

Integrated with Stripe payment gateway for secure online transactions.

---

# Cloud Image Uploads

Integrated with Cloudinary for scalable cloud-based image storage.

---

# Future Improvements

* Multi-vendor payouts
* Advanced analytics dashboard
* Live chat system
* Product recommendations
* Coupon system
* Refund management
* Advanced search filters
* Mobile app integration

---

# Author

Developed as a full-stack MERN ecommerce marketplace project.

---
