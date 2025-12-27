import api from './api';

class StorageService {
  async getAllItems() {
    try {
      const response = await api.get('/storage/items');
      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching storage items:', error);
      throw error;
    }
  }

  async createItem(itemData) {
    try {
      const response = await api.post('/storage/items', itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating storage item:', error);
      throw error;
    }
  }

  async updateItem(id, itemData) {
    try {
      const response = await api.put(`/storage/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error updating storage item:', error);
      throw error;
    }
  }

  async deleteItem(id) {
    try {
      const response = await api.delete(`/storage/items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting storage item:', error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/storage/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

export default new StorageService();
