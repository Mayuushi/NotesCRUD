import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/login`, userData);
  return response.data;
};