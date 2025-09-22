import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState({});
    const [watchHistory, setWatchHistory] = useState([]);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showUploadAvatar, setShowUploadAvatar] = useState(false);
    const [showUploadCover, setShowUploadCover] = useState(false);
    
    // Form states
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const [profileForm, setProfileForm] = useState({
        name: '',
        email: ''
    });

    const token = localStorage.getItem('token');
    
    // API Configuration with proper error handling
    const getApiBaseUrl = () => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        if (!API_BASE_URL) {
            console.error("❌ Missing API base URL. Set VITE_API_BASE_URL in .env");
            setError("Configuration error: API URL not found. Please check environment variables.");
            return null;
        }
        return API_BASE_URL;
    };

    // Check authentication on component mount
   useEffect(() => {
    // Small delay to ensure localStorage is ready after navigation
    const checkAuth = setTimeout(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.log("No authentication token found, redirecting to login");
            navigate('/login', { replace: true });
            return;
        }

        console.log("Authentication token found, initializing dashboard");
        
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);
        setProfileForm({
            name: storedUser.name || storedUser.fullName || '',
            email: storedUser.email || ''
        });
        
        fetchCurrentUser();
        fetchWatchHistory();
    }, 300);

    return () => clearTimeout(checkAuth);
}, [navigate]);

    const fetchCurrentUser = async () => {
        const API_BASE_URL = getApiBaseUrl();
        if (!API_BASE_URL) return;

        try {
            const response = await fetch(`${API_BASE_URL}/users/current-user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Current User Response:', data);

            if (response.ok && data.success) {
                setUser(data.data);
                localStorage.setItem('user', JSON.stringify(data.data));
                setProfileForm({
                    name: data.data.name || data.data.fullName || '',
                    email: data.data.email || ''
                });
            } else if (response.status === 401) {
                console.log("Authentication failed, redirecting to login");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
            setError('Failed to load user data. Please refresh the page.');
        }
    };

    const fetchWatchHistory = async () => {
        const API_BASE_URL = getApiBaseUrl();
        if (!API_BASE_URL) return;

        try {
            const response = await fetch(`${API_BASE_URL}/users/watch-history`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Watch History Response:', data);

            if (response.ok && data.success) {
                setWatchHistory(data.data || []);
            } else if (response.status === 401) {
                console.log("Authentication failed while fetching watch history");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching watch history:', error);
            // Don't show error for optional watch history
        }
    };

    const handleLogout = async () => {
        const API_BASE_URL = getApiBaseUrl();
        if (!API_BASE_URL) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/users/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Logout Response:', data);

            // Always clear localStorage and redirect, even if API call fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');

            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.warn('Logout API failed, but user logged out locally');
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear localStorage and redirect on network error
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        // ADD DEBUGGING AND VALIDATION BEFORE API CALL
        console.log('Password form data:', passwordForm);
        
        if (!passwordForm.currentPassword) {
            setError('Please enter your current password');
            return;
        }

        if (!passwordForm.newPassword) {
            setError('Please enter a new password');
            return;
        }

        if (!passwordForm.confirmPassword) {
            setError('Please confirm your new password');
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            return;
        }

        const API_BASE_URL = getApiBaseUrl();
        if (!API_BASE_URL) return;

        setLoading(true);
        setError('');
        setSuccess('');

       try {
    const response = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword,
            confirmPassword: passwordForm.confirmPassword
        }),
        credentials: 'include'
    });

    const data = await response.json();
    console.log('Change Password Response:', data);

    if (response.ok && data.success) {
        setSuccess('Password changed successfully');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowChangePassword(false);
    } else if (response.status === 401) {
        setError('Current password is incorrect or session expired');
        if (data.message && data.message.includes('token')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    } else {
        setError(data.message || 'Failed to change password. Please try again.');
    }
} catch (error) {
    console.error('Change password error:', error);
    setError('Network error. Please check your connection and try again.');
} finally {
    setLoading(false);
}
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        const API_BASE_URL = getApiBaseUrl();
        if (!API_BASE_URL) return;

        if (!profileForm.name.trim() && !profileForm.email.trim()) {
            setError('Please provide at least one field to update');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const updateData = {};
            if (profileForm.name.trim()) updateData.fullName = profileForm.name.trim();
            if (profileForm.email.trim()) updateData.email = profileForm.email.trim();

            const response = await fetch(`${API_BASE_URL}/users/update-account`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Update Profile Response:', data);

            if (response.ok && data.success) {
                setUser(data.data);
                localStorage.setItem('user', JSON.stringify(data.data));
                setSuccess('Profile updated successfully');
                setShowUpdateProfile(false);
            } else if (response.status === 401) {
                setError('Authentication failed. Please login again.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setError(data.message || 'Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Update profile error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (file, type) => {
        const API_BASE_URL = getApiBaseUrl();
        if (!API_BASE_URL) return;

        if (!file) {
            setError('Please select a file');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setError('File size must be less than 5MB');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append(type === 'avatar' ? 'avatar' : 'coverImage', file);

            const endpoint = type === 'avatar' ? '/users/avatar' : '/users/cover-image';
            
            console.log(`Uploading ${type} to ${API_BASE_URL}${endpoint}`);

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            console.log(`${type} Upload Response:`, data);

            if (response.ok && data.success) {
                setUser(data.data);
                localStorage.setItem('user', JSON.stringify(data.data));
                setSuccess(`${type === 'avatar' ? 'Avatar' : 'Cover image'} updated successfully`);
                if (type === 'avatar') setShowUploadAvatar(false);
                else setShowUploadCover(false);
            } else if (response.status === 401) {
                setError('Authentication failed. Please login again.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setError(data.message || `Failed to upload ${type}. Please try again.`);
            }
        } catch (error) {
            console.error(`${type} upload error:`, error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshToken = async () => {
        const API_BASE_URL = getApiBaseUrl();
        if (!API_BASE_URL) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Refresh Token Response:', data);

            if (response.ok && data.success) {
                if (data.data.accessToken) {
                    localStorage.setItem('token', data.data.accessToken);
                    setSuccess('Token refreshed successfully');
                }
            } else {
                setError(data.message || 'Failed to refresh token. Please login again.');
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Refresh token error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    // Auto-clear messages after 5 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                clearMessages();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

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
                                    onClick={handleRefreshToken}
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                                >
                                    Refresh Token
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 flex items-center"
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
                    
                    {/* FIXED HEADER SECTION WITH PROPER IMAGE DISPLAY */}
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-6">
                            {/* Avatar Display */}
                            <div className="flex-shrink-0">
                                <img 
                                    src={user.avatar?.url || user.avatar || 'https://via.placeholder.com/80x80/6B7280/FFFFFF?text=Avatar'} 
                                    alt="Avatar" 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-200 shadow-sm"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/80x80/6B7280/FFFFFF?text=Avatar';
                                    }}
                                />
                            </div>
                            
                            {/* User Info */}
                            <div className="flex-1">
                                <p className="text-lg text-gray-700 mb-1">
                                    Welcome back, <span className="font-semibold text-orange-600">
                                        {user.name || user.fullName || user.username || user.email || 'User'}
                                    </span>!
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.email && `Email: ${user.email}`}
                                </p>
                            </div>
                            
                            {/* Cover Image Display (if exists) */}
                            {user.coverImage?.url && (
                                <div className="flex-shrink-0">
                                    <img 
                                        src={user.coverImage.url} 
                                        alt="Cover" 
                                        className="w-24 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-start">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-red-700">{error}</p>
                                </div>
                            </div>
                            <button onClick={clearMessages} className="text-red-500 hover:text-red-700 ml-4">×</button>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-start">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-green-700">{success}</p>
                                </div>
                            </div>
                            <button onClick={clearMessages} className="text-green-500 hover:text-green-700 ml-4">×</button>
                        </div>
                    </div>
                )}

                {/* Profile Management Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Profile Actions */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Management</h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => setShowUpdateProfile(!showUpdateProfile)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                Update Profile
                            </button>
                            <button
                                onClick={() => setShowChangePassword(!showChangePassword)}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={() => setShowUploadAvatar(!showUploadAvatar)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                Upload Avatar
                            </button>
                            <button
                                onClick={() => setShowUploadCover(!showUploadCover)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                Upload Cover Image
                            </button>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium">{user.email || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium">{user.name || user.fullName || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Username:</span>
                                <span className="font-medium">{user.username || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{user.phone || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-medium text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Last Login:</span>
                                <span className="font-medium">{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Change Password Form */}
                {showChangePassword && (
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="New Password (min 6 characters)"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                minLength="6"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                minLength="6"
                                required
                            />
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                                >
                                    {loading ? 'Changing...' : 'Change Password'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowChangePassword(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Update Profile Form */}
                {showUpdateProfile && (
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Update Profile</h3>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateProfile(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Upload Avatar */}
                {showUploadAvatar && (
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Avatar</h3>
                        <div className="space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        handleFileUpload(e.target.files[0], 'avatar');
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <p className="text-sm text-gray-500">Max file size: 5MB. Supported formats: JPG, PNG, GIF</p>
                            <button
                                onClick={() => setShowUploadCover(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Watch History */}
                {watchHistory.length > 0 && (
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Watch History</h3>
                        <div className="space-y-2">
                            {watchHistory.slice(0, 5).map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-gray-700">{item.title || 'Video'}</span>
                                    <span className="text-sm text-gray-500">
                                        {item.watchedAt ? new Date(item.watchedAt).toLocaleDateString() : 'Recently'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            </div>
        </div>
    );
}
                        