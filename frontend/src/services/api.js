import axios from 'axios';

const API_BASE_URL = '/api';

// Tasks API
export const tasksAPI = {
  getTasks: async (params = {}) => {
    const response = await axios.get(`${API_BASE_URL}/tasks`, { params });
    return response.data;
  },

  getTask: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  },

  createTask: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, data);
    return response.data;
  },

  updateTask: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks/stats`);
    return response.data;
  },

  getActivity: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}/activity`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/users`);
    return response.data;
  },
};
