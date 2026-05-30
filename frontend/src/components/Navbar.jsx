import React, {
  useContext,
  useState,
  useEffect
} from 'react';
import { motion } from 'framer-motion';

import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  CartContext
} from '../context/CartContext';

import {
  AuthContext
} from '../context/AuthContext';

import './Navbar.css';


const Navbar = () => {

  const navigate =
    useNavigate();

  const [searchText,
  setSearchText] =
   useState("");

  const location =
  useLocation();

  const {
  cart,
  clearCart
} =
  useContext(CartContext);

  const {
    user,
    logoutUser
  } = useContext(AuthContext);

  const hideSearchPages = [
  "/login",
  "/register",
  "/cart",
  "/profile",
  "/checkout",
  "/orders",
  "/become-seller",
  "/seller/dashboard",
  "/create-product",
];

const showSearch =
  !hideSearchPages.includes(
    location.pathname
  ) &&
  !location.pathname.startsWith(
    "/edit-product/"
  );

  useEffect(() => {

  if (
    location.pathname !== "/products"
  ) {

    setSearchText("");

  }

}, [location.pathname]);


  // TOTAL CART COUNT
  const cartCount =
    cart?.items?.reduce(

      (acc, item) =>

        acc + item.quantity,

      0

    ) || 0;


  // =====================================
  // HANDLE SELLER
  // =====================================

  const handleSeller = () => {

  if (!user) {
    navigate("/login");
    return;
  }

  if (user.role === "artisan") {
    navigate("/seller/dashboard");
    return;
  }

  navigate("/become-seller");
};

const handleLogout = () => {

  clearCart();

  logoutUser();
};

    

  return (

    <header className="navbar glass">

      <div className="container nav-container">

        {/* LOGO */}
        <Link
          to="/"
          className="nav-brand"
        >

          <span className="text-gradient">
            Artisan
          </span>

          Market

        </Link>


        {/* SEARCH BAR */}

{showSearch && (

  <div className="search-bar-container">

    <input
  type="text"

  placeholder="Search handcrafted items..."

  className="nav-search"

  value={searchText}

  onChange={(e) =>
    setSearchText(
      e.target.value
    )
  }

  onKeyDown={(e) => {

    if (e.key === "Enter") {

      navigate(
        `/products?search=${encodeURIComponent(
          searchText
        )}`
      );

    }

  }}
/>

  </div>

)}

        {/* NAV LINKS */}
        <nav className="nav-links">

          <Link
  to="/products"
  className="nav-link"
  style={{
    color:
      location.pathname === "/products"
        ? "var(--primary-color)"
        : "",
  }}
>
  Explore
</Link>


         {/* SELLER BUTTON */}
<button
  onClick={handleSeller}
  className="nav-link"
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    font: "inherit",
    color:
      location.pathname === "/seller/dashboard"
        ? "var(--primary-color)"
        : "",
  }}
>
  {user?.role === "artisan"
    ? "Seller Dashboard"
    : "Become Seller"}
</button>

          {/* CART */}
          <Link
            to="/cart"
            className="nav-link cart-icon"
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ fontSize: '1.5rem' }}>🛒</span>
            
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="cart-badge"
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-12px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </Link>


          {/* PROFILE */}
         {user && (

  <Link
    to="/profile"
    className="nav-link"
    style={{
      color:
        location.pathname === "/profile"
          ? "var(--primary-color)"
          : "",
    }}
  >
    👤 Profile
  </Link>

)}


          {/* LOGOUT */}
          {user ? (

            <button

                onClick={handleLogout}

                 className="btn btn-outline"
              >

                Logout

               </button>

          ) : (

            <>

              <Link
                to="/login"
                className="nav-link"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
              >
                Join Now
              </Link>

            </>

          )}

        </nav>

      </div>

    </header>
  );
};


export default Navbar;