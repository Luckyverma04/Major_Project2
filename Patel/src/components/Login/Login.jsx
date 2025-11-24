import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// ⭐ NEW: Auth Context Import
import { useAuth } from "../../context/AuthContext";

export default function Login() {

    // ⭐ NEW: Use Auth Context for navbar update
    const { setIsLoggedIn } = useAuth();

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
        if (error) setError('');
    };

    const isEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const API_BASE_URL = import.meta.env.PROD 
                ? 'https://patelcropproducts.onrender.com/api/v1'
                : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

            let loginData, apiEndpoint;

            if (isAdminLogin) {
                apiEndpoint = `${API_BASE_URL}/admin/login`;
                loginData = {
                    username: formData.emailOrUsername,
                    password: formData.password
                };
            } else {
                apiEndpoint = `${API_BASE_URL}/users/login`;
                loginData = { password: formData.password };

                if (isEmail(formData.emailOrUsername)) {
                    loginData.email = formData.emailOrUsername;
                } else {
                    loginData.username = formData.emailOrUsername;
                }
            }

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

            if (response.data) {

                const { success, data, user, token, message, accessToken } = response.data;
                
                if (success !== false) {

                    let authToken = token || accessToken || data?.token || data?.accessToken;

                    if (authToken) {
                        localStorage.setItem('token', authToken);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

                        // ⭐ NEW: Tell Navbar that login is successful
                        setIsLoggedIn(true);
                    } else {
                        throw new Error('Authentication token not received. Please try again.');
                    }

                    const userData = user || data?.user || data;

                    if (userData && typeof userData === 'object') {
                        localStorage.setItem('user', JSON.stringify(userData));

                        if (isAdminLogin) {
                            localStorage.setItem('userType', 'admin');
                            localStorage.setItem('adminData', JSON.stringify(userData));
                        } else {
                            localStorage.setItem('userType', 'user');
                        }
                    }

                    setTimeout(() => {
                        if (isAdminLogin) {
                            navigate('/admin/dashboard', { replace: true });
                        } else {
                            navigate('/dashboard', { replace: true });
                        }
                    }, 150);

                } else {
                    throw new Error(message || 'Login failed. Please try again.');
                }
            }

        } catch (error) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
            localStorage.removeItem('adminData');

            let errorMessage = 'An unexpected error occurred. Please try again.';

            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                switch (status) {
                    case 400:
                        errorMessage = data?.message || 'Invalid request.';
                        break;
                    case 401:
                        errorMessage = 'Invalid credentials.';
                        break;
                    case 404:
                        errorMessage = isAdminLogin ? 'Admin not found.' : 'User not found.';
                        break;
                    case 500:
                        errorMessage = 'Server error. Try later.';
                        break;
                    default:
                        errorMessage = data?.message || data?.error || 'Login failed.';
                }
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

                        {/* Toggle Admin/User Login */}
                        <div className="text-center mb-6">
                            <div className="inline-flex rounded-lg p-1 bg-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAdminLogin(false)}
                                    className={`px-6 py-2 rounded-md text-sm font-medium 
                                        ${!isAdminLogin ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}
                                >
                                    User Login
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsAdminLogin(true)}
                                    className={`px-6 py-2 rounded-md text-sm font-medium 
                                        ${isAdminLogin ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}
                                >
                                    Admin Login
                                </button>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {isAdminLogin ? 'Sign in to admin panel' : 'Sign in to your account'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                                {error}
                            </div>
                        )}

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Username/Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {isAdminLogin ? 'Admin Username' : 'Email or Username'}
                                </label>

                                <input
                                    type="text"
                                    name="emailOrUsername"
                                    required
                                    value={formData.emailOrUsername}
                                    onChange={handleChange}
                                    className="w-full py-4 px-4 rounded-xl bg-gray-50 border-2 border-gray-200"
                                    placeholder={isAdminLogin ? "Admin Username" : "Email or Username"}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full py-4 px-4 rounded-xl bg-gray-50 border-2 border-gray-200"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-xl text-lg"
                            >
                                {loading ? "Signing in..." : isAdminLogin ? "Admin Login" : "Login"}
                            </button>
                        </form>

                        {!isAdminLogin && (
                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?
                                    <Link to="/signup" className="text-orange-600 ml-1">
                                        Sign up here
                                    </Link>
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
