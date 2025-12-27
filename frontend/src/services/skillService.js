import api from './api';

class SkillService {
  async getAllSkills() {
    try {
      const response = await api.get('/skills');
      return response.data.skills || [];
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  }

  async createSkill(skillData) {
    try {
      const response = await api.post('/skills', skillData);
      return response.data;
    } catch (error) {
      console.error('Error creating skill:', error);
      throw error;
    }
  }

  async updateSkill(id, skillData) {
    try {
      const response = await api.put(`/skills/${id}`, skillData);
      return response.data;
    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  }

  async deleteSkill(id) {
    try {
      const response = await api.delete(`/skills/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  }
}

export default new SkillService();
