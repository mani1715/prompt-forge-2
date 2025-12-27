import api from './api';

class ContactService {
  async submitContact(contactData) {
    try {
      const response = await api.post('/contacts/', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  }

  async getAllContacts() {
    try {
      const response = await api.get('/contacts/admin/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }

  async getContact(id) {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  }

  async markAsRead(id, read = true) {
    try {
      const response = await api.patch(`/contacts/${id}/read`, { read });
      return response.data;
    } catch (error) {
      console.error('Error marking contact as read:', error);
      throw error;
    }
  }

  async updateContact(id, contactData) {
    try {
      const response = await api.put(`/contacts/${id}`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  async createContact(contactData) {
    try {
      const response = await api.post('/contacts/', contactData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  async deleteContact(id) {
    try {
      const response = await api.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}

export default new ContactService();
