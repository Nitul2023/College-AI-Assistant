import axios from 'axios';
import API_URL from '../config/api';

// Signup
export const signup = async (userData) => {
  const response = await axios.post(`${API_BASE}/auth/signup`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Update CGPA
export const updateCGPA = async (cgpa) => {
  const token = getToken();
  const response = await axios.put(
    `${API_BASE}/auth/update-cgpa`,
    { cgpa },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Calculate CGPA
export const calculateCGPA = async () => {
  const token = getToken();
  const response = await axios.post(
    `${API_BASE}/auth/calculate-cgpa`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Get CGPA details
export const getCGPADetails = async () => {
  const token = getToken();
  const response = await axios.get(
    `${API_BASE}/auth/cgpa-details`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
