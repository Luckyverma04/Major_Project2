import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ onMenuToggle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check if admin is already logged in
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsAdmin(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin credentials (in production, this should be server-side)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'patelcrop123'
  };

  const handleAdminLogin = () => {
    if (adminLoginForm.username === ADMIN_CREDENTIALS.username && 
        adminLoginForm.password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      setShowAdminLogin(false);
      setLoginError('');
      setAdminLoginForm({ username: '', password: '' });
      setIsMenuOpen(false);
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('adminLoggedIn');
    setIsMenuOpen(false);
  };

  const handleAdminLoginInputChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (onMenuToggle) {
      onMenuToggle(newMenuState);
    }
  };

  const navLinks = [
    { to: "/", text: "Home", icon: "🏠" },
    { to: "/about", text: "About", icon: "ℹ️" },
    { to: "/contact", text: "Contact", icon: "✉️" },
    { to: "/bulkorder", text: "Bulk Order", icon: "📦" },
    { to: "/product", text: "Products", icon: "🛒" },
    // { to: "/github", text: "Github", icon: "💻" },
    // Conditionally add admin link if user is admin
    ...(isAdmin ? [{ to: "/admin", text: "Admin Panel", icon: "⚙️", isAdmin: true }] : []),
    { to: "/login", text: "Login", isButton: true, color: "bg-blue-600 hover:bg-blue-700 text-white" },
    { to: "/signup", text: "Sign Up", isButton: true, color: "bg-green-600 hover:bg-green-700 text-white" }
  ];

  return (
    <>
      {/* Header with z-index to ensure it stays above content */}
      <header className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-gray-900 shadow-xl' : 'bg-gray-800'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <NavLink
              to="/"
              className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 flex items-center"
            >
              <span className="mr-2 text-3xl">🛒</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                Patel Crop Gifts
              </span>
            </NavLink>

            {/* Admin Status Indicator & Menu Button */}
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <div className="hidden sm:flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <span className="mr-1">👤</span>
                  Admin
                </div>
              )}
              
              <button
                className={`p-2 rounded-md focus:outline-none transition-all ${isMenuOpen ? 'bg-gray-700 rotate-90' : 'hover:bg-gray-700'}`}
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <div className="w-8 flex flex-col space-y-2">
                  <span className={`h-1 w-full bg-yellow-400 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`h-1 w-full bg-yellow-400 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`h-1 w-full bg-yellow-400 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Menu container with full height when open */}
          <div className={`overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen py-3 bg-gray-800' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-3 pb-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-all text-lg ${
                      link.isButton
                        ? `${link.color} font-medium justify-center`
                        : link.isAdmin
                        ? 'bg-orange-600 hover:bg-orange-700 text-white font-semibold'
                        : isActive
                        ? 'bg-gray-700 text-yellow-400 font-semibold'
                        : 'text-gray-200 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3 text-xl">{link.icon}</span>
                  {link.text}
                </NavLink>
              ))}

              {/* Admin Login/Logout Section */}
              <div className="border-t border-gray-600 pt-3 mt-2">
                {!isAdmin ? (
                  <>
                    {!showAdminLogin ? (
                      <button
                        onClick={() => setShowAdminLogin(true)}
                        className="flex items-center px-4 py-3 rounded-lg text-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all w-full"
                      >
                        <span className="mr-3 text-xl">🔐</span>
                        Admin Access
                      </button>
                    ) : (
                      <div className="px-4 py-3 bg-gray-700 rounded-lg">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                          <span className="mr-2">🔐</span>
                          Admin Login
                        </h3>
                        
                        {loginError && (
                          <div className="bg-red-500 text-white text-sm px-3 py-2 rounded mb-3 text-center">
                            {loginError}
                          </div>
                        )}

                        <div className="space-y-3">
                          <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={adminLoginForm.username}
                            onChange={handleAdminLoginInputChange}
                            className="w-full px-3 py-2 bg-gray-600 text-white rounded border-gray-500 focus:border-blue-400 focus:outline-none"
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={adminLoginForm.password}
                            onChange={handleAdminLoginInputChange}
                            className="w-full px-3 py-2 bg-gray-600 text-white rounded border-gray-500 focus:border-blue-400 focus:outline-none"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleAdminLogin}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-all"
                            >
                              Login
                            </button>
                            <button
                              onClick={() => {
                                setShowAdminLogin(false);
                                setLoginError('');
                                setAdminLoginForm({ username: '', password: '' });
                              }}
                              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-medium transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                          
                          {/* Demo credentials hint */}
                          <div className="text-xs text-gray-400 text-center mt-2 p-2 bg-gray-600 rounded">
                            Demo: admin / patelcrop123
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center px-4 py-3 rounded-lg text-lg text-red-300 hover:bg-red-700 hover:text-white transition-all w-full"
                  >
                    <span className="mr-3 text-xl">🚪</span>
                    Admin Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic spacer that accounts for header height */}
      <div className="h-16"></div>
    </>
  );
}