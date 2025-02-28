import axios from 'axios';
import { browser } from '$app/environment';

const api = axios.create({
  baseURL: 'http://192.168.1.69:3000',
  withCredentials: true // Important for cookies
});

// Add a request interceptor to add the token
api.interceptors.request.use(
  (config) => {
    if (browser) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const response = await axios.post(
          'http://192.168.1.69:3000/auth/refresh',
          {},
          { withCredentials: true }
        );
        
        const { token } = response.data;
        
        if (token && browser) {
          localStorage.setItem('token', token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        if (browser) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;