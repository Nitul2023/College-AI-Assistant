import axios from 'axios';
import API_URL from '../config/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get student data
export const getStudentData = async () => {
  const response = await api.get('/student-data');
  return response.data;
};

// Add subject
export const addSubject = async (subject) => {
  const response = await api.post('/student-data/subjects', subject);
  return response.data;
};

// Update attendance
export const updateAttendance = async (subjectCode, attendance) => {
  const response = await api.put(`/student-data/attendance/${subjectCode}`, attendance);
  return response.data;
};

// Mark attendance
export const markAttendance = async (subjectCode, present) => {
  const response = await api.post(`/student-data/attendance/${subjectCode}/mark`, { present });
  return response.data;
};

// Update marks
export const updateMarks = async (subjectCode, marks) => {
  const response = await api.put(`/student-data/marks/${subjectCode}`, marks);
  return response.data;
};

// Add timetable entry
export const addTimetableEntry = async (entry) => {
  const response = await api.post('/student-data/timetable', entry);
  return response.data;
};

// Bulk setup (onboarding)
export const bulkSetup = async (data) => {
  const response = await api.post('/student-data/bulk-setup', data);
  return response.data;
};

export default api;
