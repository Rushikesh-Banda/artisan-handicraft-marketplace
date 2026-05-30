import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

import BecomeSeller
from "./pages/BecomeSeller";

import SellerDashboard
from "./pages/seller/SellerDashboard";

import CreateProduct
from "./pages/seller/CreateProduct";

import EditProduct
from "./pages/seller/EditProduct";

import Footer from "./components/Footer";

import PageBackButton
from "./components/PageBackButton";

import Checkout
from "./pages/Checkout";

import Orders
from "./pages/Orders";

import ForgotPassword
from "./pages/ForgotPassword";


const App = () => {

  return (

    <BrowserRouter>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Navbar />

<PageBackButton />

          <main
           style={{
            flex: 1,
           }}
          >

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* PRODUCTS */}
            <Route
              path="/products"
              element={<Products />}
            />

            {/* PRODUCT DETAILS */}
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            {/* LOGIN */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={<Register />}
            />

            {/* FORGOT PASSWORD */}
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

            {/* PROFILE */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* CART */}
<Route
  path="/cart"
  element={<Cart />}
/>

{/* CHECKOUT */}
<Route
  path="/checkout"
  element={<Checkout />}
/>

{/* ORDERS */}
<Route
  path="/orders"
  element={<Orders />}
/>

            {/* BECOME SELLER */}
            <Route
              path="/become-seller"
              element={<BecomeSeller />}
            />

            {/* SELLER DASHBOARD */}
            <Route
              path="/seller/dashboard"
              element={<SellerDashboard />}
            />

            {/* CREATE PRODUCT */}
            <Route
              path="/create-product"
              element={<CreateProduct />}
            />

            {/* EDIT PRODUCT */}
            <Route
              path="/edit-product/:id"
              element={<EditProduct />}
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
};

export default App;