import axios from 'axios';

const API_URL = 'https://artisan-handicraft-marketplace.onrender.com/api/reviews';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { headers: { Authorization: `Bearer ${user.token}` } };
  }
  return {};
};

export const getProductReviews = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData, getAuthHeaders());
  return response.data;
};
