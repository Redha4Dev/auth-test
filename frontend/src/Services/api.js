import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getKids = async (name, id) => {
  try {
    const response = await api.get(`/kids`, {
      params: { name, id }, // Send parameters in the query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching kids data:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const getKid = (name, id) => {
  try{
    const response = api.get(`/kids/${id}`, {
      params: { name, id }, // Send parameters in the query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching kid data:", error.response?.data?.message || error.message);
    throw error;
  }
}

export const addKid = async (kidData) => {
  try {
    const response = await api.post("/kids", kidData);
    return response.data;
  } catch (error) {
    console.error("Error adding kid:", error.response?.data?.message || error.message);
    throw error;
  }
}
