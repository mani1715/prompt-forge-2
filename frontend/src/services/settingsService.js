import api from './api';

class SettingsService {
  async getSettings() {
    try {
      const response = await api.get('/settings/');
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }

  async updateSettings(settingsData) {
    try {
      const response = await api.put('/settings/', settingsData);
      return response.data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
}

export default new SettingsService();
