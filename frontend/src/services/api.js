import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Expenses API
export const expensesAPI = {
  create: (data) => api.post('/expenses', data),
  getAll: (params) => api.get('/expenses', { params }),
  getById: (id) => api.get(`/expenses/${id}`),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
  approve: (id) => api.post(`/expenses/${id}/approve`),
  reject: (id, reason) => api.post(`/expenses/${id}/reject`, { reason }),
};

// Breakdowns API
export const breakdownsAPI = {
  create: (data) => api.post('/breakdowns', data),
  getAll: (params) => api.get('/breakdowns', { params }),
  getById: (id) => api.get(`/breakdowns/${id}`),
  update: (id, data) => api.put(`/breakdowns/${id}`, data),
  delete: (id) => api.delete(`/breakdowns/${id}`),
  acknowledge: (id) => api.post(`/breakdowns/${id}/acknowledge`),
  updateStatus: (id, data) => api.post(`/breakdowns/${id}/status`, data),
};

export default api;
