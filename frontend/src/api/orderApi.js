import axios from "axios";

const API_URL =
  "https://artisan-handicraft-marketplace.onrender.com/api/orders";

const getAuthHeaders = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (
    user &&
    user.token
  ) {

    return {

      headers: {

        Authorization:
          `Bearer ${user.token}`,

      },

    };
  }

  return {};
};


// ==============================
// CREATE ORDER
// ==============================

export const createOrder =
  async (orderData) => {

    const response =
      await axios.post(

        API_URL,

        orderData,

        getAuthHeaders()
      );

    return response.data;
};


// ==============================
// MY ORDERS
// ==============================

export const getMyOrders =
  async () => {

    const response =
      await axios.get(

        `${API_URL}/my-orders`,

        getAuthHeaders()
      );

    return response.data;
};


// ==============================
// GET ORDER BY ID
// ==============================

export const getOrderById =
  async (id) => {

    const response =
      await axios.get(

        `${API_URL}/${id}`,

        getAuthHeaders()
      );

    return response.data;
};