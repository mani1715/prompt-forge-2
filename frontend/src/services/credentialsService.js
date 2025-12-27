import api from './api';

const credentialsService = {
  // Get all credentials
  getAllCredentials: async () => {
    const response = await api.get('/credentials/');
    return response.data;
  },

  // Get a specific credential
  getCredential: async (id) => {
    const response = await api.get(`/credentials/${id}`);
    return response.data;
  },

  // Create a new credential
  createCredential: async (credentialData) => {
    const response = await api.post('/credentials/', credentialData);
    return response.data;
  },

  // Update a credential
  updateCredential: async (id, credentialData) => {
    const response = await api.put(`/credentials/${id}`, credentialData);
    return response.data;
  },

  // Delete a credential
  deleteCredential: async (id) => {
    const response = await api.delete(`/credentials/${id}`);
    return response.data;
  },

  // Sync credentials to environment
  syncToEnvironment: async () => {
    const response = await api.post('/credentials/sync-to-env');
    return response.data;
  }
};

export default credentialsService;
