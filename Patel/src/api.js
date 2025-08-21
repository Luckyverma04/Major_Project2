import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api', // This will be proxied to your Node.js backend
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Example API functions
export const checkHealth = () => api.get('/health');
export const registerUser = (userData) => api.post('/register', userData);
export const getUsers = () => api.get('/users');

// Add more API calls as needed