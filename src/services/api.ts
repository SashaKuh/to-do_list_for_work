import axios from "axios";

const api = axios.create({
  baseURL: "https://to-do-list-for-work-backend-nest.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (accessToken: string) => {
  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getTasks = async () => {
  try {
    const response = await api.get("/todolists");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const updateTask = async (taskId: string, updatedData: any) => {
  try {
    const response = await api.put(`/todolists/${taskId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await api.delete(`/todolists/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const assignTask = async (taskId: string, email: string) => {
  try {
    const response = await api.put(`/todolists/${taskId}/assign`, { email });
    return response.data;
  } catch (error) {
    console.error("Error assigning task:", error);
    throw error;
  }
};

export const registerUser = async (values: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post("/auth/register", values);

    if (response.status === 204) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw new Error(error instanceof Error ? error.message : "Registration error");
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    console.log(response.status);

    if (response.status === 201) {
      return { success: true, data: response.data };
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Network error" };
  }
};

export default api;
