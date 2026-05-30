# Artisan Handicraft Marketplace - Frontend

This is the React frontend for the Artisan Handicraft Marketplace, bootstrapped with [Vite](https://vitejs.dev/).

## Technologies Used
- **React 18**
- **Vite** (for fast bundling and development)
- **React Router DOM** (for SPA navigation)
- **Axios** (for API calls)
- **Socket.io-client** (for real-time notifications)
- **Vanilla CSS** (with modern glassmorphism UI design)

## Prerequisites
- Node.js (v16 or higher recommended)
- NPM

## Getting Started

1. **Install Dependencies**
   Navigate to this `frontend` directory and install the necessary packages:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Currently, the application points to `http://localhost:5000` for API calls (via proxy setup or direct hardcoded URLs). If you deploy this, make sure to update your base URLs in the `/src/api/` and `/src/sockets/socketClient.js` files.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start the Vite dev server, typically accessible at `http://localhost:5173`.

## Folder Structure
- `/src/api`: Axios clients grouped by features.
- `/src/components`: Reusable UI components (Navbar, Cards, etc.).
- `/src/context`: React Context Providers for global state (Auth, Cart).
- `/src/pages`: Full page views (Home, Login, Dashboard, etc.).
- `/src/sockets`: WebSockets client configuration.
- `/src/styles`: Global CSS and design tokens.
- `/src/utils`: Helper functions (formatting, auth checks).
