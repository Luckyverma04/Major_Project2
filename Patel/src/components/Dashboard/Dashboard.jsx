import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const handleLogout = async () => {
        setLoading(true);
        setError('');

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
            
            // Call the logout API
            await axios.post(`${API_BASE_URL}/users/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Logout successful');
            
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Redirect to login page
            navigate('/login');
            
        } catch (error) {
            console.error('Logout error:', error);
            
            // Even if API call fails, still clear local storage and redirect
            // This ensures user is logged out from frontend even if backend has issues
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
            
            // You can still show an error message if needed
            if (error.response) {
                setError('Logout completed, but there was a server issue.');
            } else {
                setError('Logout completed, but there was a network issue.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleQuickLogout = () => {
        // Quick logout without API call (fallback)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <div className="flex space-x-4">
                                <Link 
                                    to="/"
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                                >
                                    Home
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging out...
                                        </>
                                    ) : (
                                        'Logout'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-gray-600">
                            Welcome back, <span className="font-medium text-orange-600">{user.name || user.email || 'User'}</span>!
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">{error}</p>
                                <button 
                                    onClick={() => setError('')}
                                    className="text-sm text-yellow-600 underline hover:text-yellow-500 mt-1"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">
                                Login Successful!
                            </h3>
                            <p className="text-sm text-green-700 mt-1">
                                You have successfully logged into your dashboard.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Link to="/product" className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Products</h3>
                                <p className="text-sm text-gray-500">View all products</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/bulkorder" className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Bulk Orders</h3>
                                <p className="text-sm text-gray-500">Place bulk orders</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/about" className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">About</h3>
                                <p className="text-sm text-gray-500">Learn more about us</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/contact" className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                                <p className="text-sm text-gray-500">Get in touch</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* User Info Card */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                        <button 
                            onClick={handleQuickLogout}
                            className="text-sm text-red-600 hover:text-red-700 underline"
                            title="Quick logout (no API call)"
                        >
                            Quick Logout
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{user.email || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{user.name || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-medium text-green-600">Active</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Last Login:</span>
                            <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Token:</span>
                            <span className="font-mono text-xs text-gray-500">
                                {token ? `${token.substring(0, 20)}...` : 'Not available'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}