import axios from "axios";

// Set the base URL to your Render backend
const API_BASE_URL = "https://bernardo-server.onrender.com/api/users";

// Login user
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Create new user (signup)
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Optional: Get current user info
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};