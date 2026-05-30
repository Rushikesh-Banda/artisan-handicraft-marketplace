import axios from 'axios';

const API_URL = 'https://artisan-handicraft-marketplace.onrender.com/api/users';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { headers: { Authorization: `Bearer ${user.token}` } };
  }
  return {};
};

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, getAuthHeaders());
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData, getAuthHeaders());
  return response.data;
};
