import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Helper function to determine if input is email or username
    const isEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // API URL configuration
            const API_BASE_URL = import.meta.env.PROD 
                ? 'https://patelcropproducts.onrender.com/api/v1'
                : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
            
            console.log('Using API URL:', API_BASE_URL);
            console.log('Admin Login Mode:', isAdminLogin);

            let loginData, apiEndpoint;

            if (isAdminLogin) {
                // ✅ FIXED: Admin login uses username field
                apiEndpoint = `${API_BASE_URL}/admin/login`;
                loginData = {
                    username: formData.emailOrUsername, // ✅ Changed from 'email' to 'username'
                    password: formData.password
                };
                
                console.log('🔐 Admin login data:', { 
                    username: formData.emailOrUsername,
                    endpoint: apiEndpoint 
                });
            } else {
                // REGULAR USER LOGIN - Your existing logic
                apiEndpoint = `${API_BASE_URL}/users/login`;
                loginData = {
                    password: formData.password,
                };

                // Add either email or username based on input format
                if (isEmail(formData.emailOrUsername)) {
                    loginData.email = formData.emailOrUsername;
                } else {
                    loginData.username = formData.emailOrUsername;
                }
            }

            console.log('Sending login data to:', apiEndpoint);
            console.log('Login data:', { ...loginData, password: '[HIDDEN]' });

            const response = await axios({
                method: 'POST',
                url: apiEndpoint,
                data: loginData,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true,
                timeout: 30000
            });

            console.log('Login response:', response.data);

            if (response.data) {
                const { success, data, user, token, message, accessToken } = response.data;
                
                if (success !== false) {
                    // Extract token from different possible locations
                    let authToken = null;
                    
                    if (token) {
                        authToken = token;
                    } else if (accessToken) {
                        authToken = accessToken;
                    } else if (data?.token) {
                        authToken = data.token;
                    } else if (data?.accessToken) {
                        authToken = data.accessToken;
                    }

                    if (authToken) {
                        localStorage.setItem('token', authToken);
                        console.log('✅ Token stored successfully');
                        
                        // Set default auth header for future requests
                        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                    } else {
                        console.error('❌ No token found in response:', response.data);
                        throw new Error('Authentication token not received. Please try again.');
                    }

                    // Store user/admin data
                    const userData = user || data?.user || data;
                    if (userData && typeof userData === 'object') {
                        localStorage.setItem('user', JSON.stringify(userData));
                        console.log('✅ User data stored successfully');

                        // Store user type for role-based navigation
                        if (isAdminLogin) {
                            localStorage.setItem('userType', 'admin');
                            localStorage.setItem('adminData', JSON.stringify(userData));
                        } else {
                            localStorage.setItem('userType', 'user');
                        }
                    } else {
                        console.warn('⚠️ No user data in response');
                    }

                    const storedToken = localStorage.getItem('token');
                    if (!storedToken) {
                        throw new Error('Failed to store authentication token');
                    }

                    console.log('✅ Login successful, token verified, navigating...');
                    
                    // Navigate based on user type
                    setTimeout(() => {
                        if (isAdminLogin) {
                            navigate('/admin/dashboard', { 
                                replace: true,
                                state: { loginSuccess: true, isAdmin: true }
                            });
                        } else {
                            // Check if user has admin role even in regular login
                            const userRole = userData?.role || userData?.userType;
                            if (userRole === 'admin' || userRole === 'moderator') {
                                localStorage.setItem('userType', 'admin');
                                navigate('/admin/dashboard', { 
                                    replace: true,
                                    state: { loginSuccess: true, isAdmin: true }
                                });
                            } else {
                                navigate('/dashboard', { 
                                    replace: true,
                                    state: { loginSuccess: true }
                                });
                            }
                        }
                    }, 150);

                } else {
                    throw new Error(message || 'Login failed. Please try again.');
                }
            } else {
                throw new Error('Invalid response from server');
            }

        } catch (error) {
            console.error('❌ Login error details:', error);

            // Clear any partial data on error
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
            localStorage.removeItem('adminData');

            let errorMessage = 'An unexpected error occurred. Please try again.';

            if (error.code === 'ECONNABORTED') {
                errorMessage = 'Request timeout. The server might be starting up. Please wait a moment and try again.';
            } else if (error.code === 'ERR_NETWORK') {
                errorMessage = 'Network error. Please check your internet connection.';
            } else if (error.response) {
                const status = error.response.status;
                const data = error.response.data;
                
                switch (status) {
                    case 400:
                        errorMessage = data?.message || 'Invalid request. Please check your input.';
                        break;
                    case 401:
                        if (isAdminLogin) {
                            errorMessage = 'Invalid admin credentials. Please check your username and password.';
                        } else {
                            errorMessage = 'Invalid email/username or password. Please check your credentials.';
                        }
                        break;
                    case 403:
                        errorMessage = isAdminLogin 
                            ? 'Access denied. You do not have admin privileges.' 
                            : 'Access denied. Please check your credentials.';
                        break;
                    case 404:
                        errorMessage = isAdminLogin 
                            ? 'Admin not found. Please check your username.' 
                            : 'User not found. Please check your email/username or sign up for a new account.';
                        break;
                    case 429:
                        errorMessage = 'Too many login attempts. Please wait a few minutes and try again.';
                        break;
                    case 500:
                    case 502:
                    case 503:
                        errorMessage = 'Server error. Please try again in a few minutes.';
                        break;
                    default:
                        errorMessage = data?.message || data?.error || `Server error (${status}). Please try again.`;
                }
            } else if (error.request) {
                errorMessage = 'Unable to connect to server. Please check your internet connection and try again.';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="px-8 py-12 sm:px-12 lg:px-16">
                        {/* Admin/User Toggle */}
                        <div className="text-center mb-6">
                            <div className="inline-flex rounded-lg p-1 bg-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAdminLogin(false)}
                                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                        !isAdminLogin 
                                        ? 'bg-white text-orange-600 shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    User Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAdminLogin(true)}
                                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isAdminLogin 
                                        ? 'bg-white text-orange-600 shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Admin Login
                                </button>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {isAdminLogin 
                                    ? 'Please sign in to admin panel' 
                                    : 'Please sign in to your account'
                                }
                            </p>
                        </div>
                        
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-red-600 text-sm font-medium">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-2">
                                    {isAdminLogin ? 'Admin Username' : 'Email or Username'}
                                </label>
                                <input
                                    type="text"
                                    name="emailOrUsername"
                                    id="emailOrUsername"
                                    value={formData.emailOrUsername}
                                    onChange={handleChange}
                                    placeholder={isAdminLogin ? "Enter your admin username" : "Enter your email or username"}
                                    required
                                    disabled={loading}
                                    autoComplete="username"
                                    className="w-full py-4 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 font-medium focus:border-orange-500 focus:bg-white focus:outline-none transition duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {isAdminLogin ? (
                                    <p className="mt-1 text-xs text-gray-500">
                                        Enter your admin username (not email)
                                    </p>
                                ) : (
                                    <p className="mt-1 text-xs text-gray-500">
                                        You can use either your email address or username to sign in
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                    autoComplete="current-password"
                                    className="w-full py-4 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 font-medium focus:border-orange-500 focus:bg-white focus:outline-none transition duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        disabled={loading}
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded disabled:opacity-50"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                {!isAdminLogin && (
                                    <div className="text-sm">
                                        <Link to="/forgot-password" className="text-orange-600 hover:text-orange-700 font-medium">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition ease-in-out duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {isAdminLogin ? 'Signing In as Admin...' : 'Signing In...'}
                                        </span>
                                    ) : (
                                        isAdminLogin ? 'Sign In as Admin' : 'Sign In'
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        {!isAdminLogin && (
                            <>
                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        Don't have an account? 
                                        <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium ml-1">
                                            Sign up here
                                        </Link>
                                    </p>
                                </div>

                                {/* Social Login Options - Only for regular users */}
                                <div className="mt-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                            <span className="ml-2">Google</span>
                                        </button>

                                        <button
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                            <span className="ml-2">Facebook</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {/* Debug info in development */}
                        {import.meta.env.MODE === 'development' && (
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                                <p><strong>Debug Info:</strong></p>
                                <p>API URL: {import.meta.env.PROD 
                                    ? 'https://patelcropproducts.onrender.com/api/v1'
                                    : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
                                }</p>
                                <p>Mode: {import.meta.env.MODE}</p>
                                <p>Production: {import.meta.env.PROD ? 'Yes' : 'No'}</p>
                                <p>Admin Login: {isAdminLogin ? 'Yes' : 'No'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}