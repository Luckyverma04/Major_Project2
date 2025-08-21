import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [productIdCounter, setProductIdCounter] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    productPrice: '',
    productBulkPrice: '',
    productMinOrder: '',
    productDescription: '',
    productFeatures: '',
    productEmoji: '',
    productBestseller: false
  });

  // Admin credentials (in production, this should be server-side)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'patelcrop123'
  };

  // Check if user is already logged in
  useEffect(() => {
    const adminLoggedIn = JSON.parse(localStorage.getItem('adminLoggedIn') || 'false');
    if (adminLoggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  // Load sample products when authenticated
  useEffect(() => {
    if (isAuthenticated && products.length === 0) {
      const sampleProducts = [
        {
          id: 1,
          name: "Cotton T-Shirt",
          category: "clothing",
          price: 299,
          bulkPrice: 199,
          minOrder: 50,
          description: "High-quality cotton t-shirt perfect for promotional events",
          features: ["100% Cotton", "Pre-shrunk", "Customizable Print"],
          image: "👕",
          bestseller: true,
          inStock: true,
          rating: 4.5,
          reviews: 245,
          dateAdded: new Date().toLocaleDateString()
        },
        {
          id: 2,
          name: "Premium Backpack",
          category: "bags",
          price: 899,
          bulkPrice: 650,
          minOrder: 25,
          description: "Premium quality backpack with multiple compartments",
          features: ["Water Resistant", "Multiple Compartments", "Ergonomic Design"],
          image: "🎒",
          bestseller: true,
          inStock: true,
          rating: 4.6,
          reviews: 189,
          dateAdded: new Date().toLocaleDateString()
        }
      ];
      
      setProducts(sampleProducts);
      setProductIdCounter(3);
    }
  }, [isAuthenticated, products.length]);

  const handleLogin = () => {
    if (loginForm.username === ADMIN_CREDENTIALS.username && 
        loginForm.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminLoggedIn');
    setLoginForm({ username: '', password: '' });
    setProducts([]);
    setProductIdCounter(1);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Login Screen Component
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🔐 Admin Login</h1>
            <p className="text-gray-600">Patel Crop Gifts Admin Panel</p>
          </div>

          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-center">
              {loginError}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginInputChange}
                placeholder="Enter username"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                placeholder="Enter password"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Login to Admin Panel
            </button>

            <div className="text-center mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-500">Username: <strong>admin</strong></p>
              <p className="text-xs text-gray-500">Password: <strong>patelcrop123</strong></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    // Simple validation
    if (!formData.productName || !formData.productCategory || !formData.productPrice || 
        !formData.productBulkPrice || !formData.productMinOrder) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newProduct = {
      id: productIdCounter,
      name: formData.productName,
      category: formData.productCategory,
      price: parseFloat(formData.productPrice),
      bulkPrice: parseFloat(formData.productBulkPrice),
      minOrder: parseInt(formData.productMinOrder),
      description: formData.productDescription,
      features: formData.productFeatures ? formData.productFeatures.split(',').map(f => f.trim()) : [],
      image: formData.productEmoji || '📦',
      bestseller: formData.productBestseller,
      inStock: true,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 300 + 50),
      dateAdded: new Date().toLocaleDateString()
    };

    setProducts(prev => [...prev, newProduct]);
    setProductIdCounter(prev => prev + 1);
    setShowSuccessMessage(true);
    
    // Reset form
    setFormData({
      productName: '',
      productCategory: '',
      productPrice: '',
      productBulkPrice: '',
      productMinOrder: '',
      productDescription: '',
      productFeatures: '',
      productEmoji: '',
      productBestseller: false
    });

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const toggleBestseller = (id) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, bestseller: !product.bestseller }
        : product
    ));
  };

  const toggleStock = (id) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.minOrder), 0);
  const bestsellerCount = products.filter(p => p.bestseller).length;
  const outOfStockCount = products.filter(p => !p.inStock).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 p-5">
      <div className="max-w-7xl mx-auto bg-white bg-opacity-95 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-800 to-blue-600 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white opacity-10 animate-pulse"></div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h1 className="text-4xl font-bold mb-2">🎁 Patel Crop Gifts</h1>
              <p className="text-xl opacity-90">Admin Panel - Product Management</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 pb-0">
          <div className="bg-gradient-to-r from-red-400 to-orange-400 text-white p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">{totalProducts}</div>
            <div className="text-lg opacity-90">Total Products</div>
          </div>
          <div className="bg-gradient-to-r from-teal-400 to-green-500 text-white p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">₹{totalValue.toLocaleString('en-IN')}</div>
            <div className="text-lg opacity-90">Total Value</div>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">{bestsellerCount}</div>
            <div className="text-lg opacity-90">Bestsellers</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">{outOfStockCount}</div>
            <div className="text-lg opacity-90">Out of Stock</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Add Product Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-blue-500">
              ➕ Add New Product
            </h2>

            {showSuccessMessage && (
              <div className="bg-green-500 text-white p-4 rounded-xl mb-6 text-center font-semibold shadow-lg animate-bounce">
                Product added successfully! 🎉
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="clothing">Clothing</option>
                  <option value="bags">Bags</option>
                  <option value="stationery">Stationery</option>
                  <option value="accessories">Accessories</option>
                  <option value="electronics">Electronics</option>
                  <option value="promotional">Promotional Items</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Regular Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter regular price"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bulk Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="productBulkPrice"
                    value={formData.productBulkPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter bulk price"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Order Quantity *
                </label>
                <input
                  type="number"
                  name="productMinOrder"
                  value={formData.productMinOrder}
                  onChange={handleInputChange}
                  required
                  min="1"
                  placeholder="Enter minimum order quantity"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Emoji
                </label>
                <input
                  type="text"
                  name="productEmoji"
                  value={formData.productEmoji}
                  onChange={handleInputChange}
                  placeholder="Enter emoji (e.g., 🎒, 👕, 📱)"
                  maxLength="2"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  placeholder="Enter product description..."
                  rows="4"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Features (comma-separated)
                </label>
                <textarea
                  name="productFeatures"
                  value={formData.productFeatures}
                  onChange={handleInputChange}
                  placeholder="e.g., Water Resistant, Multiple Compartments, Ergonomic Design"
                  rows="3"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="productBestseller"
                  checked={formData.productBestseller}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-3 text-sm font-semibold text-gray-700">
                  Mark as Bestseller
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Add Product 🚀
              </button>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-purple-500">
              📦 Product List ({totalProducts})
            </h2>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 text-lg">No products added yet</p>
                <p className="text-gray-400 text-sm">Add your first product using the form</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                      product.inStock 
                        ? 'border-gray-200 bg-gray-50 hover:border-blue-300' 
                        : 'border-red-200 bg-red-50 hover:border-red-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium capitalize">
                              {product.category}
                            </span>
                            {product.bestseller && (
                              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                                ⭐ Bestseller
                              </span>
                            )}
                            {!product.inStock && (
                              <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleBestseller(product.id)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                            product.bestseller
                              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-yellow-200'
                          }`}
                          title="Toggle Bestseller"
                        >
                          ⭐
                        </button>
                        <button
                          onClick={() => toggleStock(product.id)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                            product.inStock
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                          title="Toggle Stock Status"
                        >
                          {product.inStock ? '✓' : '✗'}
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300"
                          title="Delete Product"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Regular Price:</span>
                        <span className="font-bold text-gray-800 ml-2">₹{product.price}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Bulk Price:</span>
                        <span className="font-bold text-green-600 ml-2">₹{product.bulkPrice}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Min Order:</span>
                        <span className="font-bold text-gray-800 ml-2">{product.minOrder}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-bold text-orange-600 ml-2">★ {product.rating}</span>
                      </div>
                    </div>

                    {product.description && (
                      <p className="text-gray-600 text-sm mt-3 line-clamp-2">{product.description}</p>
                    )}

                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-3">
                      Added: {product.dateAdded} • {product.reviews} reviews
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;