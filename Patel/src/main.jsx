import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// 🛒 Cart Context
import { CartProvider } from './context/CartContext';

// Components
import Layout from './Layout';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import User from './components/User/User';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import BulkOrderPage from './components/Bulkorder/Bulkorder';
import Product from './components/Product/Product';
import AdminPanel from './components/Admin/AdminPanel';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import Home from "./pages/Home";

// Tailwind Test Component
function TailwindTest() {
  return (
    <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg m-4">
      <h1 className="text-3xl font-bold mb-4">Tailwind Test</h1>
      <p className="text-lg">If you see blue box → Tailwind is working ✅</p>
      <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mt-4 transition-colors">
        Test Button
      </button>
    </div>
  );
}

// 🔧 API Base URL
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const queryClient = new QueryClient();

// 🔵 Router Setup
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'user/:userid', element: <User /> },
      { path: 'bulkorder', element: <BulkOrderPage /> },
      { path: 'product', element: <Product /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'admin', element: <AdminPanel /> },
      { path: 'test', element: <TailwindTest /> },
      { path: 'admin/dashboard', element: <AdminDashboard /> },
      { path: 'admin/users', element: <AdminDashboard /> },
      { path: 'admin/products', element: <AdminDashboard /> },
    ],
  },
]);

// 🔥 Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* 🛒 Wrap whole app inside CartProvider */}
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);
