import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { set } from "date-fns";

const API_URL = "http://localhost:5000"; // Adjust based on your backend
// Sign up function
export const signUpAdmin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Login function
export const logIn = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/loginAsAdmin`, credentials);
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

// Update Authenticated User info
export const updateUserData = async (userData) => {
  try {
    const response = await axios.patch(`${API_URL}/updateUserData`, userData, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateKidInfos = async (kidData) => {
  try {
    const response = await axios.patch(`${API_URL}/updateKidData` , kidData , {
      withCredentials : true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verfieCode = async () => {
  try {
    const response = await axios.post(`${API_URL}/verifyCode` , {
      withCredentials : true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}