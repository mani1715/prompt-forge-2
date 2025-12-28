import axios from 'axios';

/**
 * API Configuration for Production Deployment
 * 
 * IMPORTANT: Protocol enforcement happens in request interceptor
 * to ensure HTTPS is used in production environments
 */

// Create axios instance WITHOUT baseURL - we'll set it per request
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second default timeout
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add token to requests if available AND ensure correct base URL
api.interceptors.request.use(
  (config) => {
    // CRITICAL: Build the correct base URL on EVERY request to ensure protocol matches
    const backendUrl = process.env.REACT_APP_BACKEND_URL || '/api';
    let baseURL = backendUrl;
    
    // If relative path and HTTPS page, convert to absolute HTTPS URL
    if (backendUrl.startsWith('/')) {
      if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
        baseURL = `${window.location.origin}${backendUrl}`;
        console.log('[API Request] Using HTTPS URL:', baseURL);
      }
    } else if (backendUrl.startsWith('http://') && typeof window !== 'undefined' && window.location.protocol === 'https:') {
      // Upgrade HTTP to HTTPS if page is HTTPS
      baseURL = backendUrl.replace('http://', 'https://');
      console.log('[API Request] Upgraded to HTTPS:', baseURL);
    }
    
    // Build the full URL - ensure config.url is properly combined with baseURL
    // If config.url is already an absolute URL, don't modify it
    if (config.url && !config.url.startsWith('http://') && !config.url.startsWith('https://')) {
      // For relative URLs, ensure we use the correct protocol
      if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
        // If the URL starts with /, it's absolute path
        if (config.url.startsWith('/')) {
          config.url = `${window.location.origin}${config.url}`;
        } else {
          // If it's a relative path, combine with baseURL
          config.url = `${baseURL}/${config.url}`;
        }
        console.log('[API Request] Final URL:', config.url);
      } else {
        // Set the base URL for this request (for non-HTTPS)
        config.baseURL = baseURL;
      }
    } else {
      // For absolute URLs, upgrade HTTP to HTTPS if needed
      if (config.url && config.url.startsWith('http://') && typeof window !== 'undefined' && window.location.protocol === 'https:') {
        config.url = config.url.replace('http://', 'https://');
        console.log('[API Request] Upgraded URL to HTTPS:', config.url);
      } else {
        // Set the base URL for this request
        config.baseURL = baseURL;
      }
    }
    
    // Check for both admin and client tokens
    const token = localStorage.getItem('admin_token') || 
                  localStorage.getItem('adminToken') || 
                  localStorage.getItem('client_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors with improved logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      const currentPath = window.location.pathname;
      
      // If already on login page, don't redirect
      if (currentPath.includes('/admin/login') || currentPath.includes('/client/login')) {
        return Promise.reject(error);
      }

      // Check if we have a token
      const adminToken = localStorage.getItem('admin_token') || localStorage.getItem('adminToken');
      const clientToken = localStorage.getItem('client_token');
      
      if (!adminToken && !clientToken) {
        // No token, redirect to appropriate login based on current path
        if (currentPath.includes('/client')) {
          window.location.href = '/client/login';
        } else {
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }

      // If already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Clear tokens and redirect to appropriate login
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('client_token');
      localStorage.removeItem('client_data');
      
      processQueue(error, null);
      isRefreshing = false;
      
      // Small delay to prevent multiple redirects
      setTimeout(() => {
        if (currentPath.includes('/client')) {
          window.location.href = '/client/login';
        } else {
          window.location.href = '/admin/login';
        }
      }, 100);
      
      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      error.message = 'Network error. Please check your connection.';
    }

    return Promise.reject(error);
  }
);

export default api;
