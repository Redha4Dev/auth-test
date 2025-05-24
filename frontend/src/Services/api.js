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

export const getKid = async (name, id) => {
  try {
    const response = await api.get(`/admin/manage-kids/`, {
      params: { name, id, t: new Date().getTime() }, // added timestamp to prevent caching
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }
    });

    console.log("✅ getKid response:", response.data);
    return response.data;

  } catch (error) {
    console.error(
      "❌ Error fetching kid data:",
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
        } catch (err) {
          console.log('bad')
        }
      };

export const resetPassword = async (token, password, confirmPassword) => {
  try {
    const response = await api.patch(`/resetPassword/${token}`, {
      password,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const updatePassword = async (userId, currentPassword, newPassword, confirmNewPassword) => {
  try {
    const response = await api.patch('/settings', {
      id: userId,
      currentPassword,
      newPassword,
      confirmNewPassword
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating password:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const getParents = async (name,id) => {
  try {
    const response = await api.get(`/admin/parent`, {
      params: { name, id }, // Send parameters in the query string
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching parents data:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
export const getParent = async (name, id) => {
  try {
    const response = await api.post(`/parent/profile`, {
      name, id
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching parent data:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
export const getTeacher = async (name, id) => {
  try {
    const response = await api.get(`/admin/teacher`, {
      params: { name, id }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching teacher data:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
export const ListKids = async (name, id) => {
  try {
    const response = await api.get('/admin/school' , {
      params: { name, id}
    })
    console.log("✅ ListKids response:", response.data);
    return response.data;
  } catch(error) {
    console.error(
      "Error fetching kids data:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
export const deleteKid = async (kid) => {
  try {
    const response = await api.delete('/admin/manage-kids', {
      data: {
        name: kid.name,
        id: kid.id
      }
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting kid:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
export const deleteParent = async (parent) => {
  try {
    const response = await api.delete('/parent', {
      data: {
        name: parent.name,
        id: parent.id
      }
    });

    return response.data;
    } catch (error) {
      console.error(
        "Error deleting parent:",
        error.response?.data?.message || error.message
      );
      throw error;
    }


}
export const deleteTeacher = async (teacher) => {
  try {
    const response = await api.delete('/teacher', {
      data: {
        name: teacher.name,
        id: teacher.id
      }
    });

    return response.data;
    } catch (error) {
      console.error(
        "Error deleting parent:",
        error.response?.data?.message || error.message
      );
      throw error;
    }



}
export const getAllMessages = async (id) => {
  try {
    const response = await api.get(`/chat/${id}`);
    return response.data;
  } catch {
    console.error(
      "Error fetching messages:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

export const SendMessage = async (sender, recevier, message) => {
  try {
    const response = await api.post(`/chat/${recevier}`, { message , _id : sender});
    return response.data;
  } catch {
    console.error(
      "Error fetching messages:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
export const getMessage = async (id) => {
  try {
    const response = await api.get(`/chat/message/${id}`);
    return response.data;
  } catch {
    console.error(
      "Error fetching messages:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

export const getAllTeacher = async (name, id) => {
  try {
    const response = await api.get('/admin/ListTeachers', {
      params: { name, id }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching teacher data:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
export const removeMessage = async (id) => {
  try {
    const response = await api.delete(`/chat/message/${id}`);
    return response.data;
  } catch {
    console.error(
      "Error fetching messages:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

export const addMeal = async (meal) => {
  try {
    const response = await api.post(`/meals` , meal);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding meal:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}


