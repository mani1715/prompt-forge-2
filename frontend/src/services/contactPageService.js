import api from './api';

const contactPageService = {
  // Get contact page content (public)
  getContactPage: async () => {
    try {
      console.log('Fetching contact page from API...');
      const response = await api.get('/contact-page/');
      console.log('Contact page fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact page:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      throw error;
    }
  },

  // Update contact page content (admin only)
  updateContactPage: async (content) => {
    try {
      const response = await api.put('/contact-page/', content);
      return response.data;
    } catch (error) {
      console.error('Error updating contact page:', error);
      throw error;
    }
  },

  // Reset to default content (admin only)
  resetContactPage: async () => {
    try {
      const response = await api.post('/contact-page/reset');
      return response.data;
    } catch (error) {
      console.error('Error resetting contact page:', error);
      throw error;
    }
  }
};

export default contactPageService;
