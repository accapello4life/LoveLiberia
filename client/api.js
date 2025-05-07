import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.API_BASE_URL || 'https://loveliberia-server.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Log the API URL being used (for debugging)
console.log('API URL:', api.defaults.baseURL);

// Add a request interceptor to include the auth token if available
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

export default api;
