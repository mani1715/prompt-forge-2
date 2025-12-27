import api from './api';

export const pricingService = {
  // Get pricing configuration
  getPricing: async () => {
    const response = await api.get('/pricing/');
    return response.data;
  },

  // Update pricing configuration (admin only)
  updatePricing: async (pricingData) => {
    const response = await api.put('/pricing/', pricingData);
    return response.data;
  }
};

export default pricingService;
