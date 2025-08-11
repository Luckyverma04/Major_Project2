import React, { useState } from 'react';
import { ShoppingCart, Star, ArrowRight, Users, Award, Truck, Phone } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Featured products for home page
  const featuredProducts = [
    { id: 1, name: 'Cotton T-Shirt', price: 299, category: 'clothing', image: '/api/placeholder/300/300', rating: 4.5, inStock: true, bestseller: true },
    { id: 2, name: 'Premium Backpack', price: 899, category: 'bags', image: '/api/placeholder/300/300', rating: 4.6, inStock: true, bestseller: true },
    { id: 3, name: 'Professional Pen Set', price: 199, category: 'stationery', image: '/api/placeholder/300/300', rating: 4.3, inStock: true },
    { id: 4, name: 'ID Card Holder', price: 99, category: 'accessories', image: '/api/placeholder/300/300', rating: 4.2, inStock: true },
    { id: 5, name: 'Stainless Steel Bottle', price: 399, category: 'accessories', image: '/api/placeholder/300/300', rating: 4.7, inStock: true },
    { id: 6, name: 'Stylish Cap', price: 249, category: 'accessories', image: '/api/placeholder/300/300', rating: 4.0, inStock: true },
    { id: 7, name: 'Laptop Bag', price: 1299, category: 'bags', image: '/api/placeholder/300/300', rating: 4.5, inStock: true },
    { id: 8, name: 'Gel Pen Set', price: 299, category: 'stationery', image: '/api/placeholder/300/300', rating: 4.4, inStock: true },
  ];

  const categories = [
    { id: 'clothing', name: 'T-Shirts & Shirts', icon: '👕', description: 'Comfortable everyday wear' },
    { id: 'bags', name: 'Bags & Backpacks', icon: '🎒', description: 'For work, travel & daily use' },
    { id: 'accessories', name: 'Accessories', icon: '🧢', description: 'Caps, bottles, keychains & more' },
    { id: 'stationery', name: 'Stationery', icon: '✏️', description: 'Quality pens, pencils & supplies' },
  ];

  const addToCart = (productId) => {
    console.log('Added product to cart:', productId);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block text-yellow-300">Patel Products</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Your trusted family business for quality products - T-shirts, bags, stationery, 
            and accessories for everyone at affordable prices!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all">
              View Products
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping across India with reliable service</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium quality products backed by our family guarantee</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Business</h3>
              <p className="text-gray-600">Personal service and care that only family can provide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {categories.map(category => (
              <div 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white hover:shadow-md'
                }`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className={`text-sm ${selectedCategory === category.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Show All Products
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === 'all' ? 'Featured Products' : `${categories.find(cat => cat.id === selectedCategory)?.name || 'Products'}`}
            </h2>
            <p className="text-xl text-gray-600">Popular items from our collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.bestseller && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>

                  {/* Price and Cart */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 hover:scale-105"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Patel Products</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are a family-owned business located in Palnagar, MP, dedicated to providing 
                quality products at affordable prices. From comfortable clothing to practical 
                accessories, we serve customers across India with the personal touch that only 
                a family business can offer.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Established family business</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Quality products at fair prices</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Personal customer service</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Bulk Orders or Custom Products?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We specialize in bulk orders for businesses, schools, and organizations. 
            Contact us for custom printing, branding, and special pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call: +91 9399007475
            </button>
            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}