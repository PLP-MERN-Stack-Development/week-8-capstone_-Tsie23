import axios from 'axios';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors and token refresh
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject({
        response: {
          data: {
            error: {
              message: 'Network error. Please check your connection.',
              code: 'NETWORK_ERROR'
            }
          }
        }
      });
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if we're not already on the home page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
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

// Health check API
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;