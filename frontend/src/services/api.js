import axios from 'axios';

/**
 * API SERVICE – VERCEL + RENDER SAFE
 */

// Backend URL (Render service root)
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || 'https://mspn-dev.onrender.com';

if (!process.env.REACT_APP_BACKEND_URL) {
  console.warn(
    '⚠️ REACT_APP_BACKEND_URL not set, using fallback Render URL'
  );
}

const api = axios.create({
  // 👇 THIS IS THE FIX
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true,
});

// Attach token if exists
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('admin_token') ||
      localStorage.getItem('adminToken') ||
      localStorage.getItem('client_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      '[API Request]',
      config.method?.toUpperCase(),
      `${config.baseURL}${config.url}`
    );

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();

      const path = window.location.pathname;
      if (path.includes('/client')) {
        window.location.href = '/client/login';
      } else {
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
