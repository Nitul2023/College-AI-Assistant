// API Configuration
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_URL = isDevelopment 
  ? 'http://localhost:5000/api'
  : 'https://college-ai-assistant.onrender.com'; // ← Your Render URL

export default API_URL;
