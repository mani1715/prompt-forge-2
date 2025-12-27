import api from './api';

class ChatService {
  async getConversations() {
    try {
      const response = await api.get('/chat/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  }

  async getConversation(id) {
    try {
      const response = await api.get(`/chat/conversations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  }

  async markAsRead(id) {
    try {
      const response = await api.put(`/chat/conversations/${id}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking conversation as read:', error);
      throw error;
    }
  }

  async sendReply(id, message) {
    try {
      const response = await api.post(`/chat/conversations/${id}/reply`, { message });
      return response.data;
    } catch (error) {
      console.error('Error sending reply:', error);
      throw error;
    }
  }

  async deleteConversation(id) {
    try {
      const response = await api.delete(`/chat/conversations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  }

  // Public endpoint for customer messages
  async sendCustomerMessage(messageData) {
    try {
      const response = await api.post('/chat/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending customer message:', error);
      throw error;
    }
  }
}

export default new ChatService();
