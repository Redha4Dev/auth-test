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
    const response = await axios.post(`${API_URL}/logIn`, credentials);
    localStorage.setItem("token", response.data.token); // Save token
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Logout function "Will be removed after using only http cookies"
export const logout = () => {
  localStorage.removeItem("token"); // Remove token
};

// Get Authenticated User
export const getCurrentUser = () => {
  return localStorage.getItem("token");
};

export const fetchUserData = () => {
  try {
    // this to get the user info but the "/user" not ready now
    const response = await api.get("/user");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data?.message);
  }
}