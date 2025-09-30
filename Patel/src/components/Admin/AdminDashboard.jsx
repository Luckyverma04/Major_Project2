import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // User form state
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    role: 'user'
  });

  // Product form state
// Update your product form state to include all fields:
const [productForm, setProductForm] = useState({
  name: '',
  description: '',
  category: '',
  price: '',
  bulkPrice: '',
  minOrder: '',
  features: '',
  emoji: '📦',
  bestseller: false,
  stockQuantity: '',
  tags: '',
  metaDescription: '',
  image: null
});

  useEffect(() => {
    loadDashboardStats();
    loadUsers();
    loadProducts();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://patelcropproducts.onrender.com/api/v1/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.data || {});
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://patelcropproducts.onrender.com/api/v1/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadProducts = async () => {
  try {
    const response = await axios.get("https://patelcropproducts.onrender.com/api/v1/products");
    
    console.log("📦 Products fetched:", response.data);
    
    // yaha direct array aa rahi hai
    setProducts(response.data);  
  } catch (error) {
    console.error("❌ Error loading products:", error);
  }
};


  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://patelcropproducts.onrender.com/api/v1/admin/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      navigate('/login');
    }
  };

  const updateUserStatus = async (userId, isActive) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://patelcropproducts.onrender.com/api/v1/admin/users/status', 
        { userId, isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadUsers(); // Refresh users list
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://patelcropproducts.onrender.com/api/v1/admin/users/role', 
        { userId, role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadUsers(); // Refresh users list
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://patelcropproducts.onrender.com/api/v1/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadUsers(); // Refresh users list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://patelcropproducts.onrender.com/api/v1/products/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadProducts(); // Refresh products list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://patelcropproducts.onrender.com/api/v1/users/register', userForm);
      setUserForm({ username: '', email: '', fullName: '', password: '', role: 'user' });
      loadUsers(); // Refresh users list
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    } finally {
      setLoading(false);
    }
  };
const handleCreateProduct = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    // VALIDATION: Check bulkPrice < price
    if (parseFloat(productForm.bulkPrice) >= parseFloat(productForm.price)) {
      alert('Bulk price must be LESS than regular price');
      setLoading(false);
      return;
    }

    // VALIDATION: Check required fields
    const requiredFields = ['name', 'description', 'category', 'price', 'bulkPrice', 'minOrder'];
    const missingFields = requiredFields.filter(field => !productForm[field]);
    
    if (missingFields.length > 0) {
      alert(`Missing required fields: ${missingFields.join(', ')}`);
      setLoading(false);
      return;
    }

    // VALIDATION: Check image is provided
    if (!productForm.image) {
      alert('Product image is required');
      setLoading(false);
      return;
    }

    console.log("📦 Creating product with validated data...");

    // ✅ FIXED: Append all fields with proper field names
    formData.append('name', productForm.name);
    formData.append('description', productForm.description);
    formData.append('category', productForm.category);
    formData.append('price', parseFloat(productForm.price));
    formData.append('bulkPrice', parseFloat(productForm.bulkPrice));
    formData.append('minOrder', parseInt(productForm.minOrder));
    
    // ✅ FIXED: Use 'productImage' instead of 'image'
    formData.append('productImage', productForm.image); // 🔥 FIELD NAME CHANGED
    
    // Append optional fields if they exist
    if (productForm.features) formData.append('features', productForm.features);
    if (productForm.emoji) formData.append('emoji', productForm.emoji);
    formData.append('bestseller', productForm.bestseller.toString());
    if (productForm.stockQuantity) formData.append('stockQuantity', parseInt(productForm.stockQuantity));
    if (productForm.tags) formData.append('tags', productForm.tags);
    if (productForm.metaDescription) formData.append('metaDescription', productForm.metaDescription);

    // Debug: Check FormData contents
    console.log("📋 FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // ✅ FIXED: Use proxy URL instead of direct backend URL
    const response = await axios.post(
      '/createProduct',  // 🔥 URL CHANGED - Use proxy path
      formData, 
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    console.log("✅ Product created successfully:", response.data);
    
    // Reset form
    setProductForm({
      name: '',
      description: '',
      category: '',
      price: '',
      bulkPrice: '',
      minOrder: '',
      features: '',
      emoji: '📦',
      bestseller: false,
      stockQuantity: '',
      tags: '',
      metaDescription: '',
      image: null
    });
    
    loadProducts();
    alert('Product created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating product:', error);
    console.error('📡 Response data:', error.response?.data);
    console.error('🔢 Status:', error.response?.status);
    alert(error.response?.data?.message || 'Error creating product');
  } finally {
    setLoading(false);
  }
};

  const searchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://patelcropproducts.onrender.com/api/v1/admin/users/search?q=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🛠️ Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Admin!</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow rounded-lg mr-6">
            <nav className="p-4">
              <ul className="space-y-2">
                {[
                  { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
                  { id: 'users', label: '👥 User Management', icon: '👥' },
                  { id: 'products', label: '📦 Product Management', icon: '📦' },
                  { id: 'create-user', label: '➕ Create User', icon: '➕' },
                  { id: 'create-product', label: '🆕 Create Product', icon: '🆕' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                        activeTab === item.id
                          ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard Stats */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProducts || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Management */}
            {activeTab === 'users' && (
              <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        onClick={searchUsers}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition duration-200"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={user.role}
                              onChange={(e) => updateUserRole(user._id, e.target.value)}
                              className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                              <option value="user">User</option>
                              <option value="moderator">Moderator</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => updateUserStatus(user._id, !user.isActive)}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {user.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="text-red-600 hover:text-red-900 ml-4"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Product Management */}
            {activeTab === 'products' && (
              <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                     {products.map((product) => (
  <tr key={product._id}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        {product.productImage?.url && (
          <img
            src={product.productImage.url}
            alt={product.name}
            className="h-10 w-10 rounded-lg object-cover mr-3"
          />
        )}
        <div>
          <div className="text-sm font-medium text-gray-900">{product.name}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      ₹{product.price}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {product.category}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {product.stockQuantity || 0}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={() => deleteProduct(product._id)}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </td>
  </tr>
))}

                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Create User Form */}
            {activeTab === 'create-user' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New User</h2>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        value={userForm.username}
                        onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={userForm.fullName}
                        onChange={(e) => setUserForm({...userForm, fullName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="password"
                        value={userForm.password}
                        onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <select
                        value={userForm.role}
                        onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create User'}
                  </button>
                </form>
              </div>
            )}

            {/* Create Product Form */}
           {activeTab === 'create-product' && (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Product</h2>
    <form onSubmit={handleCreateProduct} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
          <input
            type="text"
            value={productForm.name}
            onChange={(e) => setProductForm({...productForm, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <input
            type="text"
            value={productForm.category}
            onChange={(e) => setProductForm({...productForm, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Regular Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price *</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={productForm.price}
            onChange={(e) => setProductForm({...productForm, price: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Bulk Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Price *</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={productForm.bulkPrice}
            onChange={(e) => setProductForm({...productForm, bulkPrice: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Must be less than regular price</p>
        </div>

        {/* Minimum Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order *</label>
          <input
            type="number"
            min="1"
            value={productForm.minOrder}
            onChange={(e) => setProductForm({...productForm, minOrder: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
          <input
            type="number"
            min="0"
            value={productForm.stockQuantity}
            onChange={(e) => setProductForm({...productForm, stockQuantity: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Emoji */}
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Emoji</label>
  <select
    value={productForm.emoji}
    onChange={(e) => setProductForm({ ...productForm, emoji: e.target.value })}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
  >
    <option value="">Select Emoji</option>
    <option value="👕">👕 T-Shirt</option>
    <option value="🎒">🎒 Backpack</option>
    <option value="🖊️">🖊️ Pen</option>
    <option value="🪪">🪪 ID Card Holder</option>
    <option value="🍼">🍼 Bottle</option>
    <option value="🧢">🧢 Cap</option>
    <option value="💼">💼 Laptop Bag</option>
    <option value="🖋️">🖋️ Gel Pen</option>
    <option value="👔">👔 Polo Shirt</option>
    <option value="🏃‍♂️">🏃‍♂️ Sports Bag</option>
    <option value="🖍️">🖍️ Marker</option>
    <option value="👛">👛 Wallet</option>
    <option value="👚">👚 Casual Shirt</option>
    <option value="🧳">🧳 Travel Bag</option>
    <option value="📓">📓 Notebook</option>
    <option value="⌚">⌚ Smart Watch</option>
    <option value="🎁">🎁 Gift Set</option>
  </select>
</div>


        {/* Bestseller */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={productForm.bestseller}
            onChange={(e) => setProductForm({...productForm, bestseller: e.target.checked})}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Mark as Bestseller</label>
        </div>

        {/* Features */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
          <textarea
            value={productForm.features}
            onChange={(e) => setProductForm({...productForm, features: e.target.value})}
            placeholder="Enter features separated by commas"
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">Separate features with commas</p>
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <input
            type="text"
            value={productForm.tags}
            onChange={(e) => setProductForm({...productForm, tags: e.target.value})}
            placeholder="Enter tags separated by commas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={productForm.description}
            onChange={(e) => setProductForm({...productForm, description: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
          <textarea
            value={productForm.metaDescription}
            onChange={(e) => setProductForm({...productForm, metaDescription: e.target.value})}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Product Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductForm({...productForm, image: e.target.files[0]})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
}