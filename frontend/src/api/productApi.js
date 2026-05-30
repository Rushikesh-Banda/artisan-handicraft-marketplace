import axios from "axios";


// =========================================
// BASE URL
// =========================================

const API =
  "https://artisan-handicraft-marketplace.onrender.com/api/products";


// =========================================
// GET TOKEN (called fresh each request)
// =========================================

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


// =========================================
// GET ALL PRODUCTS
// =========================================

export const getProducts =
  async () => {

    try {

      const response =
        await axios.get(API);

      return response.data.products || [];

    } catch (error) {

      console.error(
        "Error fetching products:",
        error
      );

      return [];
    }
};


// =========================================
// GET PRODUCT BY ID
// =========================================

export const getProductById =
  async (id) => {

    try {

      const response =
        await axios.get(
          `${API}/${id}`
        );

      return response.data;

    } catch (error) {

      console.error(
        "Error fetching product:",
        error
      );

      return null;
    }
};


// =========================================
// CREATE PRODUCT
// =========================================

export const createProduct =
  async (productData) => {

    const response =
      await axios.post(
        API,
        productData,
        getConfig()
      );

    return response.data;
};


// =========================================
// UPDATE PRODUCT
// =========================================

export const updateProduct =
  async (id, productData) => {

    const response =
      await axios.put(
        `${API}/${id}`,
        productData,
        getConfig()
      );

    return response.data;
};


// =========================================
// DELETE PRODUCT
// =========================================

export const deleteProduct =
  async (id) => {

    const response =
      await axios.delete(
        `${API}/${id}`,
        getConfig()
      );

    return response.data;
};

// =========================================
// ADD REVIEW
// =========================================

export const addReview =
  async (
    productId,
    reviewData
  ) => {

    const response =
      await axios.post(

        `${API}/${productId}/reviews`,

        reviewData,

        getConfig()
      );

    return response.data;
};

// =========================================
// ADD REPLY
// =========================================

export const addReply =
  async (
    productId,
    reviewId,
    comment
  ) => {

    const response =
      await axios.post(

        `${API}/${productId}/reviews/${reviewId}/reply`,

        { comment },

        getConfig()
      );

    return response.data;
};


// =========================================
// DELETE REVIEW
// =========================================

export const deleteReview =
  async (
    productId,
    reviewId
  ) => {

    const response =
      await axios.delete(

        `${API}/${productId}/reviews/${reviewId}`,

        getConfig()
      );

    return response.data;
};