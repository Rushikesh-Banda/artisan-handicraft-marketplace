import axios from "axios";


// ======================================
// BASE URL
// ======================================

const API =
  "https://artisan-handicraft-marketplace.onrender.com/api/seller";


// ======================================
// GET CONFIG (fresh token each call)
// ======================================

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
    },
  };
};


// ======================================
// BECOME SELLER
// ======================================

export const becomeSeller =
  async (sellerData) => {

    const response =
      await axios.post(
        `${API}/become-seller`,
        sellerData,
        getConfig()
      );

    return response.data;
};


// ======================================
// GET SELLER PRODUCTS
// ======================================

export const getSellerProducts =
  async () => {

    const response =
      await axios.get(
        `${API}/my-products`,
        getConfig()
      );

    return response.data;
};