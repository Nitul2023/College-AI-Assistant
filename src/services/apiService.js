import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:5000/api';

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

class ApiService {
  
  // Get all student data
  async getStudentData() {
    const response = await api.get('/student-data');
    return response.data;
  }

  // Add subject
  async addSubject(subjectData) {
    const response = await api.post('/student-data/subjects', subjectData);
    return response.data;
  }

  // Update attendance
  async updateAttendance(subjectCode, attendanceData) {
    const response = await api.put(`/student-data/attendance/${subjectCode}`, attendanceData);
    return response.data;
  }

  // Mark attendance (present/absent)
  async markAttendance(subjectCode, present) {
    const response = await api.post(`/student-data/attendance/${subjectCode}/mark`, { present });
    return response.data;
  }

  // Update marks
  async updateMarks(subjectCode, marksData) {
    const response = await api.put(`/student-data/marks/${subjectCode}`, marksData);
    return response.data;
  }

  // Add timetable entry
  async addTimetableEntry(entryData) {
    const response = await api.post('/student-data/timetable', entryData);
    return response.data;
  }

  // Bulk setup
  async bulkSetup(setupData) {
    const response = await api.post('/student-data/bulk-setup', setupData);
    return response.data;
  }
}

export default new ApiService();