import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUsername: '', // Changed from 'email' to support both
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
    // ✅ Always rely on VITE_API_BASE_URL, do not fallback to localhost in production
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        console.error("❌ API_BASE_URL is missing! Please set VITE_API_BASE_URL in .env.production");
        setError("Configuration error: API base URL missing.");
        return;
    }

    // Prepare login data
    const loginData = {
        password: formData.password,
    };

    if (isEmail(formData.emailOrUsername)) {
        loginData.email = formData.emailOrUsername;
    } else {
        loginData.username = formData.emailOrUsername;
    }

    console.log('Login data being sent:', loginData);

    // ✅ Add withCredentials: true to allow cookies/sessions
    const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        loginData,
        { withCredentials: true }
    );

    console.log('Login successful:', response.data);

    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }

    if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    navigate('/dashboard');
} catch (error) {
    console.error('Login error:', error);

    if (error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Login failed. Please try again.';
        
        if (errorMessage.includes('user not exist') || errorMessage.includes('not found')) {
            setError('No account found with this email or username. Please check your credentials or sign up for a new account.');
        } else if (errorMessage.includes('password') || errorMessage.includes('incorrect') || errorMessage.includes('invalid')) {
            setError('Incorrect password. Please try again.');
        } else {
            setError(errorMessage);
        }
    } else if (error.request) {
        setError('Network error. Please check your connection and ensure the server is running.');
    } else {
        setError('An unexpected error occurred.');
    }
} finally {
    setLoading(false);
}
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="px-8 py-12 sm:px-12 lg:px-16">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-lg text-gray-600">
                                Please sign in to your account
                            </p>
                        </div>
                        
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-600 text-sm font-medium">{error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email or Username
                                </label>
                                <input
                                    type="text"
                                    name="emailOrUsername"
                                    id="emailOrUsername"
                                    value={formData.emailOrUsername}
                                    onChange={handleChange}
                                    placeholder="Enter your email or username"
                                    required
                                    disabled={loading}
                                    className="w-full py-4 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 font-medium focus:border-orange-500 focus:bg-white focus:outline-none transition duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    You can use either your email address or username to sign in
                                </p>
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

                                <div className="text-sm">
                                    <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                                        Forgot your password?
                                    </a>
                                </div>
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
                                            Signing In...
                                        </span>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Don't have an account? 
                                <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium ml-1">
                                    Sign up here
                                </Link>
                            </p>
                        </div>

                        {/* Social Login Options */}
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
                    </div>
                </div>
            </div>
        </div>
    );
}