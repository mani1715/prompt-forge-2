import api from './api';

class PageService {
  async getPageContent(pageName) {
    try {
      const response = await api.get(`/pages/${pageName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page content:', error);
      throw error;
    }
  }

  async updatePageContent(pageName, content) {
    try {
      const response = await api.put(`/pages/${pageName}`, content);
      return response.data;
    } catch (error) {
      console.error('Error updating page content:', error);
      throw error;
    }
  }
}

export default new PageService();
