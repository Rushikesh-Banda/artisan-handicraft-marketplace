# Artisan Handicraft Marketplace API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication (`/api/auth`)
- `POST /register`: Register a new user. Body: `{ name, email, password }`
- `POST /login`: Authenticate user & get token. Body: `{ email, password }`
- `POST /logout`: Logout user.

## Users (`/api/users`)
- `GET /profile`: Get logged in user profile. (Requires Token)
- `PUT /profile`: Update user profile. (Requires Token)

## Artisans (`/api/artisans`)
- `POST /`: Register as an artisan. Body: `{ storeName, bio }` (Requires Token)
- `GET /`: List all artisans.
- `GET /:id`: Get specific artisan profile.

## Products (`/api/products`)
- `GET /`: Get all products. Supports `?keyword=term`.
- `GET /:id`: Get specific product by ID.
- `POST /`: Create new product. (Requires Artisan/Admin Token). Uses multipart/form-data for image.
- `PUT /:id`: Update product. (Requires Artisan/Admin Token).
- `DELETE /:id`: Delete product. (Requires Artisan/Admin Token).

## Orders (`/api/orders`)
- `POST /`: Create an order. Body: `{ orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice }` (Requires Token)
- `GET /mine`: Get logged in user's orders. (Requires Token)
- `GET /:id`: Get order by ID. (Requires Token)

## WebSockets
Connect to `ws://localhost:5000`
- **Events**:
  - `emit('join', userId)`: Join personal notification room.
  - `on('receiveNotification')`: Listen for new alerts.
