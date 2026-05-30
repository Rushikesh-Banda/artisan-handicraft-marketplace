import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  getCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartItem as apiUpdateCartItem,
} from "../api/cartApi";

import toast from "react-hot-toast";

import {
  AuthContext,
} from "./AuthContext";


export const CartContext = createContext();


export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState({ items: [] });
  const [cartLoading, setCartLoading] = useState(false);
  const { user } =
  React.useContext(
    AuthContext
  );


  // =========================
  // FETCH CART ON MOUNT
  // =========================

  useEffect(() => {

  const fetchCart = async () => {

    try {

      if (!user) {

        setCart({
          items: [],
        });

        return;
      }

      const data =
        await getCart();

      setCart(
        data.cart || {
          items: [],
        }
      );

    } catch (error) {

      console.error(
        "Cart fetch error",
        error
      );

      setCart({
        items: [],
      });
    }
  };

  fetchCart();

}, [user]);


  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async (productId, quantity = 1) => {

    try {

      const user =
        localStorage.getItem("user");

      if (!user) {
        toast.error("Please login first");
        return { success: false };
      }

      setCartLoading(true);

      const data = await apiAddToCart(
        productId,
        quantity
      );

      setCart(data.cart);

      toast.success("Product added to cart! 🛒");

      return { success: true };

    } catch (error) {

      console.error(error);

      const msg =
        error?.response?.data?.message ||
        "Failed to add to cart";

      toast.error(msg);

      return { success: false, message: msg };

    } finally {
      setCartLoading(false);
    }
  };


  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = async (productId, quantity) => {

    try {

      if (quantity < 1) return;

      const data = await apiUpdateCartItem(
        productId,
        quantity
      );

      setCart(data.cart);

    } catch (error) {

      console.error(error);

      const msg =
        error?.response?.data?.message ||
        "Failed to update quantity";

      toast.error(msg);
    }
  };


  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = async (productId) => {

    try {

      const data = await apiRemoveFromCart(
        productId
      );

      setCart(data.cart);

      toast.success("Item removed from cart");

    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };


  // =========================
  // CLEAR CART (local only)
  // =========================

  const clearCart = () => {
    setCart({ items: [] });
  };


  // =========================
  // CART COUNT
  // =========================

  const cartCount =
    cart?.items?.reduce(
      (acc, item) => acc + item.quantity,
      0
    ) || 0;


  return (

    <CartContext.Provider
      value={{
        cart,
        cartLoading,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};