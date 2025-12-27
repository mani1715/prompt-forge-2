import api from './api';

class AdminService {
  async login(username, password) {
    try {
      const response = await api.post('/admins/login', { username, password });
      const { token, admin } = response.data;
      
      // Store token and user info
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(admin));
      
      return { success: true, admin };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed'
      };
    }
  }

  async verify() {
    try {
      const response = await api.get('/admins/verify');
      return response.data.user;
    } catch (error) {
      return null;
    }
  }

  async getAllAdmins() {
    try {
      const response = await api.get('/admins/list');
      return response.data.admins || [];
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  }

  async createAdmin(adminData) {
    try {
      const response = await api.post('/admins/create', adminData);
      return response.data;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  async updateAdmin(id, adminData) {
    try {
      const response = await api.put(`/admins/${id}`, adminData);
      return response.data;
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  }

  async deleteAdmin(id) {
    try {
      const response = await api.delete(`/admins/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('admin_token');
  }
}

export default new AdminService();
