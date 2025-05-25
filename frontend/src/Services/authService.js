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
    const response = await axios.patch(`${API_URL}/updateKidData/${kidData._id}` , kidData , {
      withCredentials : true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



// Update Parent Information
export const updateParentInfos = async (parentData) => {
  try {
    console.log('Sending parent data:', parentData);
    
    const dataToSend = {
      ...parentData,
      id: parentData._id
    };
    delete dataToSend._id; 
    
    console.log('Data being sent:', dataToSend);
    
    const response = await axios.patch(`${API_URL}/parent`, dataToSend, {
      withCredentials: true,
    });
    console.log('Full response:', response);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating parent data:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

// Update Teacher Information
export const updateTeacherInfos = async (teacherData) => {
  try {
    console.log('Sending teacher data:', teacherData);
    
    const dataToSend = {
      ...teacherData,
      id: teacherData._id 
    };
    delete dataToSend._id; 
    
    console.log('Data being sent:', dataToSend);
    
    const response = await axios.patch(`${API_URL}/teacher`, dataToSend, {
      withCredentials: true,
    });
    console.log('Full response:', response);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating teacher data:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

