import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, ArrowRight, Package, Award, Truck, Shield, ShoppingCart, Eye } from 'lucide-react';

const Products = ({ onBackToHome, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const allProducts = [
    { 
      id: 1, 
      name: 'Cotton T-Shirt', 
      price: 299, 
      bulkPrice: 199, 
      category: 'clothing', 
      image: '👕', 
      rating: 4.5, 
      inStock: true, 
      bestseller: true,
      minOrder: 50,
      reviews: 245,
      features: ['100% Cotton', 'Pre-shrunk', 'Customizable Print']
    },
    { 
      id: 2, 
      name: 'Premium Backpack', 
      price: 899, 
      bulkPrice: 650, 
      category: 'bags', 
      image: '🎒', 
      rating: 4.6, 
      inStock: true, 
      bestseller: true,
      minOrder: 25,
      reviews: 189,
      features: ['Water Resistant', 'Multiple Compartments', 'Ergonomic Design']
    },
    { 
      id: 3, 
      name: 'Professional Pen Set', 
      price: 199, 
      bulkPrice: 129, 
      category: 'stationery', 
      image: '🖊️', 
      rating: 4.3, 
      inStock: true,
      minOrder: 100,
      reviews: 156,
      features: ['Premium Quality', 'Smooth Writing', 'Custom Branding Available']
    },
    { 
      id: 4, 
      name: 'ID Card Holder', 
      price: 99, 
      bulkPrice: 65, 
      category: 'accessories', 
      image: '🪪', 
      rating: 4.2, 
      inStock: true,
      minOrder: 200,
      reviews: 98,
      features: ['Durable Material', 'Clear Window', 'Lanyard Included']
    },
    { 
      id: 5, 
      name: 'Stainless Steel Bottle', 
      price: 399, 
      bulkPrice: 280, 
      category: 'accessories', 
      image: '🍼', 
      rating: 4.7, 
      inStock: true,
      minOrder: 50,
      reviews: 324,
      features: ['24hr Temperature Control', 'Leak Proof', 'Custom Engraving']
    },
    { 
      id: 6, 
      name: 'Stylish Cap', 
      price: 249, 
      bulkPrice: 165, 
      category: 'accessories', 
      image: '🧢', 
      rating: 4.0, 
      inStock: true,
      minOrder: 75,
      reviews: 132,
      features: ['Adjustable Size', 'UV Protection', 'Logo Embroidery Available']
    },
    { 
      id: 7, 
      name: 'Laptop Bag', 
      price: 1299, 
      bulkPrice: 950, 
      category: 'bags', 
      image: '💼', 
      rating: 4.5, 
      inStock: true,
      minOrder: 20,
      reviews: 276,
      features: ['Laptop Protection', 'Professional Look', 'Multiple Pockets']
    },
    { 
      id: 8, 
      name: 'Gel Pen Set', 
      price: 299, 
      bulkPrice: 199, 
      category: 'stationery', 
      image: '🖋️', 
      rating: 4.4, 
      inStock: true,
      minOrder: 100,
      reviews: 201,
      features: ['Smooth Gel Ink', 'Comfortable Grip', 'Multiple Colors']
    },
    { 
      id: 9, 
      name: 'Polo Shirt', 
      price: 399, 
      bulkPrice: 279, 
      category: 'clothing', 
      image: '👔', 
      rating: 4.3, 
      inStock: true,
      minOrder: 40,
      reviews: 167,
      features: ['Cotton Blend', 'Collar Design', 'Corporate Branding']
    },
    { 
      id: 10, 
      name: 'Sports Backpack', 
      price: 1199, 
      bulkPrice: 850, 
      category: 'bags', 
      image: '🏃‍♂️', 
      rating: 4.7, 
      inStock: true,
      minOrder: 30,
      reviews: 298,
      features: ['Large Capacity', 'Gym Compartment', 'Durable Material']
    },
    { 
      id: 11, 
      name: 'Marker Set', 
      price: 149, 
      bulkPrice: 99, 
      category: 'stationery', 
      image: '🖍️', 
      rating: 4.1, 
      inStock: true,
      minOrder: 150,
      reviews: 89,
      features: ['Vibrant Colors', 'Non-Toxic', 'Fine & Broad Tips']
    },
    { 
      id: 12, 
      name: 'Leather Wallet', 
      price: 599, 
      bulkPrice: 420, 
      category: 'accessories', 
      image: '👛', 
      rating: 4.6, 
      inStock: true,
      minOrder: 25,
      reviews: 234,
      features: ['Genuine Leather', 'RFID Blocking', 'Multiple Card Slots']
    },
    { 
      id: 13, 
      name: 'Casual Shirt', 
      price: 549, 
      bulkPrice: 380, 
      category: 'clothing', 
      image: '👚', 
      rating: 4.4, 
      inStock: true,
      minOrder: 35,
      reviews: 178,
      features: ['Comfortable Fit', 'Wrinkle Free', 'Easy Care']
    },
    { 
      id: 14, 
      name: 'Travel Bag', 
      price: 1599, 
      bulkPrice: 1150, 
      category: 'bags', 
      image: '🧳', 
      rating: 4.5, 
      inStock: true,
      minOrder: 15,
      reviews: 142,
      features: ['Wheeled Design', 'TSA Lock', 'Expandable']
    },
    { 
      id: 15, 
      name: 'Notebook Set', 
      price: 179, 
      bulkPrice: 119, 
      category: 'stationery', 
      image: '📓', 
      rating: 4.2, 
      inStock: true,
      minOrder: 200,
      reviews: 156,
      features: ['Ruled Pages', 'Hard Cover', 'Custom Cover Design']
    },
    { 
      id: 16, 
      name: 'Smart Watch', 
      price: 2499, 
      bulkPrice: 1800, 
      category: 'accessories', 
      image: '⌚', 
      rating: 4.8, 
      inStock: true,
      minOrder: 10,
      reviews: 445,
      features: ['Fitness Tracking', 'Long Battery Life', 'Water Resistant']
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: allProducts.length },
    { id: 'clothing', name: 'T-Shirts & Shirts', count: allProducts.filter(p => p.category === 'clothing').length },
    { id: 'bags', name: 'Bags & Backpacks', count: allProducts.filter(p => p.category === 'bags').length },
    { id: 'accessories', name: 'Accessories', count: allProducts.filter(p => p.category === 'accessories').length },
    { id: 'stationery', name: 'Stationery', count: allProducts.filter(p => p.category === 'stationery').length },
  ];

  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const ProductCard = ({ product }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-4 right-4 space-y-2">
        {product.bestseller && (
          <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            Bestseller
          </div>
        )}
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          -{Math.round(((product.price - product.bulkPrice) / product.price) * 100)}% Bulk
        </div>
      </div>

      {/* Product Image */}
      <div className="text-center mb-6">
        <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 mb-4">
          {product.image}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
              />
            ))}
            <span className="text-white text-sm ml-2">{product.rating}</span>
          </div>
          <span className="text-blue-200 text-sm">({product.reviews} reviews)</span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2 mb-6">
        {product.features.slice(0, 3).map((feature, index) => (
          <div key={index} className="flex items-center text-blue-200 text-sm">
            <Award className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
            {feature}
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="border-t border-white/20 pt-4 mb-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-blue-200">Retail:</span>
            <span className="text-xl font-bold text-white">₹{product.price}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-green-400">Bulk Price:</span>
            <span className="text-2xl font-bold text-green-400">₹{product.bulkPrice}</span>
          </div>
          <div className="text-blue-200 text-sm">
            Min Order: {product.minOrder} pieces
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => addToCart && addToCart(product)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-transparent border border-white/30 text-white py-2 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 text-sm flex items-center justify-center gap-1">
            <Eye className="w-3 h-3" />
            Details
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition-all duration-300 text-sm">
            Bulk Quote
          </button>
        </div>
      </div>
    </div>
  );

  const ProductRow = ({ product }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-4xl">
            {product.image}
          </div>
          {product.bestseller && (
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              Bestseller
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
                <span className="text-white text-sm ml-2">{product.rating}</span>
              </div>
              <span className="text-blue-200 text-sm">({product.reviews} reviews)</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                In Stock
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.features.map((feature, index) => (
              <span key={index} className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>

          <div className="text-blue-200 text-sm">
            Min Order: {product.minOrder} pieces • Bulk discounts available
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="lg:text-right space-y-4">
          <div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 lg:justify-end">
                <span className="text-sm text-blue-200">Retail:</span>
                <span className="text-lg font-bold text-white">₹{product.price}</span>
              </div>
              <div className="flex items-center gap-2 lg:justify-end">
                <span className="text-sm text-green-400">Bulk:</span>
                <span className="text-xl font-bold text-green-400">₹{product.bulkPrice}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 lg:justify-end">
            <button 
              onClick={() => addToCart && addToCart(product)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-300">
              Bulk Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          {onBackToHome && (
            <button 
              onClick={onBackToHome}
              className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20"
            >
              ← Back to Home
            </button>
          )}
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Patel Products Catalog
          </h1>
          <p className="text-xl text-blue-100 mb-8">Premium Corporate & Promotional Products</p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { icon: Shield, text: 'Quality Assured' },
              { icon: Truck, text: 'Fast Delivery' },
              { icon: Award, text: 'Custom Branding' },
              { icon: Package, text: 'Bulk Discounts' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <benefit.icon className="w-5 h-5 text-blue-400" />
                <span className="text-white">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <Filter className="text-blue-300 w-5 h-5 mt-3" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-slate-800">
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name" className="bg-slate-800">Sort by Name</option>
              <option value="price-low" className="bg-slate-800">Price: Low to High</option>
              <option value="price-high" className="bg-slate-800">Price: High to Low</option>
              <option value="rating" className="bg-slate-800">Highest Rated</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-blue-200 mb-6">
          Showing {filteredProducts.length} of {allProducts.length} products
          {selectedCategory !== 'all' && (
            <span className="ml-2">in {categories.find(c => c.id === selectedCategory)?.name}</span>
          )}
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
          : "space-y-6"
        }>
          {filteredProducts.map(product => 
            viewMode === 'grid' 
              ? <ProductCard key={product.id} product={product} />
              : <ProductRow key={product.id} product={product} />
          )}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-blue-200 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Bulk Orders or Custom Branding?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Get special pricing for bulk orders and add your company logo to any product!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Request Bulk Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
              Custom Branding Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;