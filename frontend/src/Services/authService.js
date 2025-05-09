import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { set } from "date-fns";

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
    console.log(response.data.data.user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Logout function "Will be removed after using only http cookies"
export const logout = async () => {
   try {
    await axios.get(`${API_URL}/logout`);
   } catch (error) {
    console.error(error);
    throw error;
   }
};

// Get Authenticated User
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/getUserData`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log('error fetching user data' , err);
  }
};

// export const fetchUserData = () => {
//   try {
//     // this to get the user info but the "/user" not ready now
//     const response = await api.get("/user");
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching user data:", error.response?.data?.message);
//   }
// }