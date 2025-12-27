import api from './api';

class AuthService {
  async login(username, password) {
    try {
      const response = await api.post('/admins/login', { username, password });
      const { token, admin } = response.data;
      
      // Store token and user info
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(admin));
      
      return { success: true, user: admin };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed'
      };
    }
  }

  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return api.post('/auth/logout').catch(() => {});
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('admin_user') || localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('admin_token') || !!localStorage.getItem('adminToken');
  }
}

export default new AuthService();
