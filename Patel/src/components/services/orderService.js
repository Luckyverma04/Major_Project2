import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://patelcropproducts.onrender.com/api/v1';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken') || localStorage.getItem('token');
};

// Create axios instance with auth
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error.response?.data || error.message;
  }
};

// Get user's orders
export const getUserOrders = async () => {
  try {
    const response = await apiClient.get('/orders/my-orders');
    return response.data;
  } catch (error) {
    console.error('Get user orders error:', error);
    throw error.response?.data || error.message;
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Get order error:', error);
    throw error.response?.data || error.message;
  }
};

// Admin: Get all orders
export const getAllOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Get all orders error:', error);
    throw error.response?.data || error.message;
  }
};

// Admin: Update order status
export const updateOrderStatus = async (orderId, statusData) => {
  try {
    const response = await apiClient.put(`/orders/${orderId}/status`, statusData);
    return response.data;
  } catch (error) {
    console.error('Update order status error:', error);
    throw error.response?.data || error.message;
  }
};

export default {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};