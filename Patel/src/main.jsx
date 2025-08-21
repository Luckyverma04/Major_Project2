'use client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// Layout and Components
import Layout from './Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import User from './components/User/User';
// import Github, { githubInfoLoader } from './components/Github/Github';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import BulkOrderPage from './components/Bulkorder/Bulkorder';
import Product from './components/Product/Product';
import AdminPanel from './components/Admin/AdminPanel'; // 🔥 NEW: Admin Panel Import

// API Configuration
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// React Query Client
const queryClient = new QueryClient();

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
         index: true,
         element: <Home /> // Using the original Home component
      },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'user/:userid', element: <User /> },
      { path: 'bulkorder', element: <BulkOrderPage /> },
      { path: 'product', element: <Product /> },
      // {
      //    path: 'github',
      //   loader: githubInfoLoader,
      //   element: <Github />
      // },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { 
        path: 'admin', 
        element: <AdminPanel /> // 🔥 NEW: Admin Panel Route
      },
    ],
  },
]);

// Render Application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);