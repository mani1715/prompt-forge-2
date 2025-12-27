import api from './api';

// Retry logic for failed requests
const retryRequest = async (requestFn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry attempt ${i + 1} of ${retries}...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const aboutService = {
  // Get About page content with retry logic
  getAboutContent: async () => {
    try {
      const response = await retryRequest(() => api.get('/about/'), 3, 1000);
      return response.data;
    } catch (error) {
      console.error('Error fetching about content:', error);
      // Return default content if API fails
      if (error.response?.status === 404 || error.code === 'ERR_NETWORK') {
        console.warn('Using default about content due to network error');
        return null; // Will trigger default content in component
      }
      throw error;
    }
  },

  // Update About page content (admin only)
  updateAboutContent: async (content) => {
    try {
      const response = await api.put('/about/', content);
      return response.data;
    } catch (error) {
      console.error('Error updating about content:', error);
      throw error;
    }
  },

  // Initialize About content with defaults (admin only)
  initializeAboutContent: async () => {
    try {
      const response = await api.post('/about/init');
      return response.data;
    } catch (error) {
      console.error('Error initializing about content:', error);
      throw error;
    }
  }
};

export default aboutService;
