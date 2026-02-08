import axios from 'axios';
import API_URL from '../config/api';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

export const addSkills = async (skills) => {
  const response = await api.post('/skills', { skills });
  return response.data;
};

export const generateRoadmap = async (goal, skills, level) => {
  const response = await api.post('/skills/generate-roadmap', {
    goal,
    skills,
    level,
  });
  return response.data;
};

export const getRoadmaps = async () => {
  const response = await api.get('/skills/roadmaps');
  return response.data;
};

export const updateStepCompletion = async (roadmapId, stepIndex, completed) => {
  const response = await api.put(`/skills/roadmaps/${roadmapId}/steps/${stepIndex}`, {
    completed,
  });
  return response.data;
};
