import axios from 'axios';

const API_URL = 'https://artisan-handicraft-marketplace.onrender.com/api/artisans';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { headers: { Authorization: `Bearer ${user.token}` } };
  }
  return {};
};

export const getAllArtisans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getArtisanProfile = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const registerAsArtisan = async (artisanData) => {
  const response = await axios.post(API_URL, artisanData, getAuthHeaders());
  return response.data;
};
