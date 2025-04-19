import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getKids = async (name, id) => {
  try {
    const response = await api.get(`/parent/kids`, {
      params: { name, id }, // Send parameters in the query string
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching kids data:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const getKid = (name, id) => {
  try {
    const response = api.get(`/admin/kids/${id}`, {
      params: { name, id }, // Send parameters in the query string
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching kid data:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const addKid = async (kidData) => {
  try {
    const response = await api.post("/admin/kids", kidData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding kid:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
export const ForgotPassword = async (email) => {
        try {
          console.log('first')
          const res = await axios.post('http://localhost:5000/forgotPassword', { email });
        //   const res = await axios.post('/api/v1/users/forgotPassword', { email });
          console.log('good')
          setMessage('Check your email for the reset link.');
        } catch (err) {
          setMessage(err.response?.data?.message || 'Something went wrong.');
          console.log('bad')
        }
      };
