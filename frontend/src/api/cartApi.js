import axios from "axios";

const API =
  "http://localhost:5002/api/cart";


// ==============================
// GET CONFIG (fresh token each call)
// ==============================

const getConfig = () => {

  const userData =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    userData?.token ||
    userData?.user?.token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};


// ==============================
// GET CART
// ==============================

export const getCart =
  async () => {

    const response =
      await axios.get(API, getConfig());

    return response.data;
};


// ==============================
// ADD TO CART
// ==============================

export const addToCart =
  async (productId, quantity) => {

    const response =
      await axios.post(
        API,
        { productId, quantity },
        getConfig()
      );

    return response.data;
};


// ==============================
// UPDATE CART ITEM QUANTITY
// ==============================

export const updateCartItem =
  async (productId, quantity) => {

    const response =
      await axios.put(
        `${API}/${productId}`,
        { quantity },
        getConfig()
      );

    return response.data;
};


// ==============================
// REMOVE FROM CART
// ==============================

export const removeFromCart =
  async (productId) => {

    const response =
      await axios.delete(
        `${API}/${productId}`,
        getConfig()
      );

    return response.data;
};