import api from './api';

const newsletterService = {
  // Public: Subscribe to newsletter
  subscribe: async (email) => {
    try {
      const response = await api.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to subscribe' };
    }
  },

  // Admin: Get all subscribers
  getAllSubscribers: async () => {
    try {
      const response = await api.get('/newsletter/admin/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch subscribers' };
    }
  },

  // Admin: Delete subscriber
  deleteSubscriber: async (subscriberId) => {
    try {
      const response = await api.delete(`/newsletter/admin/${subscriberId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete subscriber' };
    }
  },

  // Admin: Export subscribers as CSV
  exportSubscribers: async () => {
    try {
      const response = await api.get('/newsletter/admin/export');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to export subscribers' };
    }
  }
};

export default newsletterService;
