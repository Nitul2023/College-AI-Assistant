import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:5000/api/skills';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class SkillsService {
  
  async getSkills() {
    const response = await api.get('/');
    return response.data;
  }

  async addSkills(skills) {
    const response = await api.post('/', { skills });
    return response.data;
  }

  async generateRoadmap(goal, selectedSkills, level = 'Beginner') {
    const response = await api.post('/generate-roadmap', {
      goal,
      selectedSkills,
      level
    });
    return response.data;
  }

  async getRoadmaps() {
    const response = await api.get('/roadmaps');
    return response.data;
  }

  async updateStepCompletion(roadmapId, stepIndex, completed) {
    const response = await api.put(`/roadmaps/${roadmapId}/steps/${stepIndex}`, {
      completed
    });
    return response.data;
  }
}

export default new SkillsService();