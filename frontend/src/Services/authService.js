import axios from "axios";

const API_URL = "http://localhost:5000"; // Adjust based on your backend

// Sign up function
export const signUpAdmin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    localStorage.setItem("token", response.data.token); // Save token
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Login function
export const logIn = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("token", response.data.token); // Save token
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token"); // Remove token
};

// Get Authenticated User
export const getCurrentUser = () => {
  return localStorage.getItem("token");
};
