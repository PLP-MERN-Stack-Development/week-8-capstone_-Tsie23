import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.railway.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },
  
  updateProgress: async (templateId, completedSteps) => {
    const response = await api.put('/users/progress', {
      templateId,
      completedSteps
    });
    return response.data;
  }
};

// Templates API
export const templatesAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/templates', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },
  
  getBySlug: async (slug) => {
    const response = await api.get(`/templates/slug/${slug}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/templates/categories/stats');
    return response.data;
  }
};

// Glossary API
export const glossaryAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/glossary', { params });
    return response.data;
  },
  
  search: async (query) => {
    const response = await api.get('/glossary/search', { params: { q: query } });
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/glossary/categories');
    return response.data;
  }
};

// Users API
export const usersAPI = {
  getProgress: async () => {
    const response = await api.get('/users/progress');
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  }
};

export default api;