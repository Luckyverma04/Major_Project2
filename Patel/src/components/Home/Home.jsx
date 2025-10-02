import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, ArrowRight, Users, Award, Truck, Phone, Plus, Minus, X, CreditCard, MapPin, User, Mail, Calendar, Building2, Gift, Package, Handshake, Calculator, FileText, Clock, MessageCircle, Instagram, Facebook, Linkedin, Twitter, Sparkles, Zap, Shield, HeadphonesIcon, Menu } from 'lucide-react';
import axios from 'axios';
// import { createEnquiry } from '../../services/enquiryService';
// B2B Header Component (integrated)
const B2BHeader = ({ cart, onViewCart, onRequestQuote, onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (onMenuToggle) {
      onMenuToggle(newMenuState);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (onMenuToggle) {
      onMenuToggle(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    closeMenu();
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg border-b border-slate-700 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B2B</span>
            </div>
            <span>Trazoo</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection('hero-section')}
              className="px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-800"
            >
              Home
            </button>
            
            <button
              onClick={() => scrollToSection('categories-section')}
              className="px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-800"
            >
              Categories
            </button>
            
            <button
              onClick={() => scrollToSection('products-section')}
              className="px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-800"
            >
              Products
            </button>
            
            <button
              onClick={() => scrollToSection('services-section')}
              className="px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-800"
            >
              Services
            </button>
            
            <button
              onClick={() => scrollToSection('about-section')}
              className="px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-800"
            >
              About
            </button>
            
            <button
              onClick={() => scrollToSection('footer-section')}
              className="px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-800"
            >
              Contact
            </button>
          </div>

          {/* Desktop Auth and Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onRequestQuote}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <Calculator className="w-4 h-4" />
              Get Quote
            </button>

            <button
              onClick={onViewCart}
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 hover:shadow-lg font-bold"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-800 transition-colors duration-300 focus:outline-none focus:bg-slate-800"
            aria-label="Toggle menu"
            type="button"
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 transform origin-center ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'mt-1.5'}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 transform origin-center ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'mt-1.5'}`}></div>
          </button>
        </div>

        {/* Mobile Menu - Fixed Animation */}
        <div 
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 visible mt-4' 
              : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
        >
          <div className="bg-slate-800 rounded-lg p-4 space-y-2 border border-slate-700 shadow-xl">
            <button
              onClick={() => scrollToSection('hero-section')}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-700"
            >
              Home
            </button>
            
            <button
              onClick={() => scrollToSection('categories-section')}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-700"
            >
              Categories
            </button>
            
            <button
              onClick={() => scrollToSection('products-section')}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-700"
            >
              Products
            </button>
            
            <button
              onClick={() => scrollToSection('services-section')}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-700"
            >
              Services
            </button>
            
            <button
              onClick={() => scrollToSection('about-section')}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-700"
            >
              About
            </button>
            
            <button
              onClick={() => scrollToSection('footer-section')}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-700"
            >
              Contact
            </button>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 mt-4 border-t border-slate-600 space-y-2">
              <button
                onClick={() => {onRequestQuote(); closeMenu();}}
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-white"
              >
                <span className="flex items-center justify-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Get Quote
                </span>
              </button>
              
              <button
                onClick={() => {onViewCart(); closeMenu();}}
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-white relative"
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {cart.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

// B2B Bulk Quote Component
const BulkQuote = ({ onBackToHome, onSubmitQuote }) => {
    const products = [
    { id: 1, name: 'Cotton T-Shirts', basePrice: 199, bulkPrice: 149, unit: 'pieces', minOrder: 50, category: 'clothing', emoji: '👕' },
    { id: 2, name: 'Premium Backpacks', basePrice: 650, bulkPrice: 520, unit: 'pieces', minOrder: 25, category: 'bags', emoji: '🎒' },
    { id: 3, name: 'Professional Pen Sets', basePrice: 129, bulkPrice: 99, unit: 'sets', minOrder: 100, category: 'stationery', emoji: '🖊️' },
    { id: 4, name: 'ID Card Holders', basePrice: 65, bulkPrice: 45, unit: 'pieces', minOrder: 200, category: 'accessories', emoji: '🪪' },
    { id: 5, name: 'Steel Bottles', basePrice: 280, bulkPrice: 220, unit: 'pieces', minOrder: 50, category: 'accessories', emoji: '🍼' },
    { id: 6, name: 'Stylish Caps', basePrice: 165, bulkPrice: 125, unit: 'pieces', minOrder: 75, category: 'accessories', emoji: '🧢' },
    { id: 7, name: 'Laptop Bags', basePrice: 950, bulkPrice: 750, unit: 'pieces', minOrder: 20, category: 'bags', emoji: '💼' },
    { id: 8, name: 'Gel Pen Sets', basePrice: 199, bulkPrice: 149, unit: 'sets', minOrder: 100, category: 'stationery', emoji: '🖋️' },
    { id: 9, name: 'Polo Shirts', basePrice: 279, bulkPrice: 210, unit: 'pieces', minOrder: 40, category: 'clothing', emoji: '👔' },
    { id: 10, name: 'Sports Backpacks', basePrice: 850, bulkPrice: 680, unit: 'pieces', minOrder: 30, category: 'bags', emoji: '🏃‍♂️' },
    { id: 11, name: 'Marker Sets', basePrice: 99, bulkPrice: 75, unit: 'sets', minOrder: 150, category: 'stationery', emoji: '🖍️' },
    { id: 12, name: 'Leather Wallets', basePrice: 420, bulkPrice: 320, unit: 'pieces', minOrder: 25, category: 'accessories', emoji: '👛' },
    { id: 13, name: 'Casual Shirts', basePrice: 380, bulkPrice: 285, unit: 'pieces', minOrder: 35, category: 'clothing', emoji: '👚' },
    { id: 14, name: 'Travel Bags', basePrice: 1150, bulkPrice: 920, unit: 'pieces', minOrder: 15, category: 'bags', emoji: '🧳' },
    { id: 15, name: 'Notebook Sets', basePrice: 119, bulkPrice: 89, unit: 'sets', minOrder: 200, category: 'stationery', emoji: '📓' },
    { id: 16, name: 'Smart Watches', basePrice: 1800, bulkPrice: 1440, unit: 'pieces', minOrder: 10, category: 'accessories', emoji: '⌚' }
  ];
 const [quoteForm, setQuoteForm] = useState({
  name: "",
  email: "",  
  phone: "",
  message: "",
  companyName: "",
  contactPerson: "",
  productCategory: "",
  specificProduct: "",
  quantityRequired: "",
  customization: "",
  gstNumber: ""
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm(prev => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const enquiryData = {
    name: quoteForm.name,
    email: quoteForm.email,
    phone: quoteForm.phone,
    message: `Product: ${quoteForm.specificProduct || quoteForm.productCategory}\n${quoteForm.customization ? `Customization: ${quoteForm.customization}\n\n` : ''}${quoteForm.message}`,
    companyName: quoteForm.companyName,
    contactPerson: quoteForm.contactPerson,
    productCategory: quoteForm.productCategory,
    quantityRequired: Number(quoteForm.quantityRequired)
  };

  console.log('Form data:', enquiryData);
  alert('Form submitted! we will contact you in some time.');
  
  // Reset form
  setQuoteForm({
    name: "", email: "", phone: "", message: "", companyName: "",
    contactPerson: "", productCategory: "", specificProduct: "", 
    quantityRequired: "", customization: "", gstNumber: ""
  });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all hover:gap-3"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Calculator className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Request Bulk Quote
      </h1>
      <p className="text-gray-600 text-lg">Get customized pricing for your bulk corporate orders</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Company Name *
          </label>
          <input
            type="text"
            name="companyName"
            value={quoteForm.companyName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            required
          />
        </div>

        {/* Contact Person */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Contact Person *
          </label>
          <input
            type="text"
            name="contactPerson"
            value={quoteForm.contactPerson}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            required
          />
        </div>

        {/* Your Name */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={quoteForm.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            required
          />
        </div>

        {/* Email */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={quoteForm.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            required
          />
        </div>

        {/* Phone */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={quoteForm.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            required
          />
        </div>

        {/* Product Category - Updated with your products */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Product Category *
          </label>
          <select
            name="productCategory"
            value={quoteForm.productCategory}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            required
          >
            <option value="">Select Product Category</option>
            <option value="clothing">👕 Clothing (T-Shirts, Polo Shirts, Casual Shirts)</option>
            <option value="bags">🎒 Bags (Backpacks, Laptop Bags, Travel Bags)</option>
            <option value="stationery">🖊️ Stationery (Pens, Markers, Notebooks)</option>
            <option value="accessories">🪪 Accessories (ID Holders, Bottles, Caps, Wallets, Watches)</option>
            <option value="custom-sets">🎁 Custom Gift Sets</option>
          </select>
        </div>

        {/* Specific Product Selection */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Specific Product
          </label>
          <select
            name="specificProduct"
            value={quoteForm.specificProduct}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
          >
            <option value="">Select Specific Product</option>
            {products
              .filter(product => !quoteForm.productCategory || product.category === quoteForm.productCategory)
              .map(product => (
                <option key={product.id} value={product.name}>
                  {product.emoji} {product.name} - Min. {product.minOrder} {product.unit}
                </option>
              ))
            }
          </select>
        </div>

        {/* Quantity Required */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            Quantity Required *
          </label>
          <input
            type="number"
            name="quantityRequired"
            value={quoteForm.quantityRequired}
            onChange={handleInputChange}
            min="1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            placeholder="Enter quantity"
            required
          />
          {quoteForm.specificProduct && (
            <p className="text-xs text-gray-500 mt-1">
              Minimum order: {products.find(p => p.name === quoteForm.specificProduct)?.minOrder || 1} pieces
            </p>
          )}
        </div>

        {/* GST Number */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
            GST Number
          </label>
          <input
            type="text"
            name="gstNumber"
            value={quoteForm.gstNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
            placeholder="07AABCU9603R1ZM"
          />
        </div>
      </div>
      
      {/* Customization Requirements */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
          Customization Requirements
        </label>
        <textarea
          name="customization"
          value={quoteForm.customization}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 resize-none"
          placeholder="Logo branding, custom packaging, personalized messages, color preferences, etc."
        />
      </div>

      {/* Additional Message */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
          Additional Message *
        </label>
        <textarea
          name="message"
          value={quoteForm.message}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 resize-none"
          placeholder="Any specific requirements, delivery timeline, budget constraints, or questions..."
          required
        />
      </div>

      <div className="text-center pt-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Submit Quote Request
          </span>
        </button>
        <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          We'll respond within 24 hours with customized pricing
        </p>
      </div>
    </form>
  </div>
</div>
    </div>
  );
};

// Corporate Cart Component (modified for B2B)
const CorporateCart = ({ cart, updateCartQuantity, removeFromCart, onBackToHome, onProceedToQuote }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.bulkPrice * item.quantity), 0);
  };

  const calculateDiscount = (subtotal) => {
    if (subtotal >= 10000) return Math.round(subtotal * 0.15); // 15% for orders above 10k
    if (subtotal >= 5000) return Math.round(subtotal * 0.10); // 10% for orders above 5k
    return Math.round(subtotal * 0.05); // 5% base B2B discount
  };

  const calculateGST = (amount) => {
    return Math.round(amount * 0.18); // 18% GST
  };

  const subtotal = calculateTotal();
  const discount = calculateDiscount(subtotal);
  const discountedAmount = subtotal - discount;
  const gst = calculateGST(discountedAmount);
  const total = discountedAmount + gst;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all hover:gap-3"
            >
              ← Back to Home
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-12 border border-white/20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your corporate cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Add corporate gift sets to get bulk pricing and amazing discounts!</p>
            <button 
              onClick={onBackToHome}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl"
            >
              Browse Corporate Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all hover:gap-3"
            >
              ← Back to Home
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Corporate Cart
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <h2 className="text-xl font-bold">Gift Sets ({cart.length})</h2>
                <p className="text-sm text-gray-600">Bulk pricing applied automatically</p>
              </div>
              <div className="divide-y">
                {cart.map(item => (
                  <div key={item._id || item.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="relative">
                      <img 
                        src={item.image?.url || '/api/placeholder/300/300'} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">B2B</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-green-600 font-bold text-lg">₹{item.bulkPrice} per piece</p>
                      <p className="text-sm text-gray-500">Min. order: {item.minOrder || 25} pieces</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartQuantity(item._id || item.id, Math.max(item.minOrder || 25, item.quantity - 1))}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all transform hover:scale-105"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item._id || item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 flex items-center justify-center transition-all transform hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">₹{item.bulkPrice * item.quantity}</p>
                      <button
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="text-red-500 hover:text-red-700 mt-2 p-2 hover:bg-red-50 rounded-full transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-4 border border-white/20">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Corporate Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>B2B Discount ({discount > 0 ? Math.round((discount/subtotal)*100) : 5}%)</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="font-semibold">₹{gst}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800 font-medium">
                  <strong>💰 Volume Discounts:</strong><br/>
                  • ₹5K+: 10% off<br/>
                  • ₹10K+: 15% off
                </p>
              </div>

              <button
                onClick={() => onProceedToQuote({ subtotal, discount, gst, total, items: cart })}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 hover:shadow-xl shadow-lg mb-3"
              >
                <Calculator className="w-5 h-5" />
                Get Detailed Quote
              </button>

              <button 
                onClick={onBackToHome}
                className="w-full border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-700 hover:text-purple-700 py-4 rounded-xl font-semibold transition-all"
              >
                Continue Shopping
              </button>

              <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Need help? Call: +91 9399007475
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animation Hook for Counters
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  const startAnimation = () => setHasStarted(true);
  
  return [count, startAnimation];
};

// Main B2B Home Component
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation counters
  const [clientCount, startClientCount] = useCountUp(500);
  const [orderCount, startOrderCount] = useCountUp(25);
  const [discountCount, startDiscountCount] = useCountUp(15);
  const [cityCount, startCityCount] = useCountUp(28);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🎁', description: 'Complete corporate gift collection', color: 'from-blue-400 to-purple-500' },
    { id: 'electronics', name: 'Electronics', icon: '📱', description: 'Tech gadgets and devices', color: 'from-green-400 to-teal-500' },
    { id: 'welcome-kits', name: 'Welcome Kits', icon: '🎁', description: 'New employee onboarding gifts', color: 'from-yellow-400 to-orange-500' },
    { id: 'client-gifts', name: 'Client Appreciation', icon: '🤝', description: 'Strengthen business relationships', color: 'from-pink-400 to-red-500' },
    { id: 'employee-recognition', name: 'Employee Recognition', icon: '🏆', description: 'Reward and motivate teams', color: 'from-purple-400 to-indigo-500' },
  ];


  // Fetch products from backend API
// Home.jsx mein - Products page ki tarah direct URL use karo
useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching products from API...');
        
        const response = await axios.get('https://patelcropproducts.onrender.com/api/v1/products');
        
        console.log('📦 API Response:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
          console.log('✅ Products loaded:', response.data.length);
        } else {
          console.log('❌ Invalid response format');
          setProducts([]);
        }
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Debug: Check products state
  useEffect(() => {
    console.log('🔄 Products state updated:', products);
  }, [products]);

  // Filter products based on selected category - FIXED
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => {
        const categoryMatch = product.category && product.category.toLowerCase() === selectedCategory;
        console.log(`Product: ${product.name}, Category: ${product.category}, Match: ${categoryMatch}`);
        return categoryMatch;
      });

  // Debug: Check filtered products
  useEffect(() => {
    console.log('🔍 Filtered products:', filteredProducts);
    console.log('🎯 Selected category:', selectedCategory);
    console.log('📊 Total products:', products.length);
  }, [filteredProducts, selectedCategory, products]);


  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      updateCartQuantity(product._id, existingItem.quantity + 1);
    } else {
      setCart(prev => [...prev, {
        ...product,
        quantity: product.minOrder || 25,
        bulkPrice: product.bulkPrice || product.price * 0.7 // Default bulk discount if not provided
      }]);
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart(prev => prev.map(item =>
      item._id === productId ? { ...item, quantity: Math.max(item.minOrder || 25, newQuantity) } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const handleRequestQuote = () => {
    setCurrentPage('quote');
  };

  const handleViewCart = () => {
    setCurrentPage('cart');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleSubmitQuote = (quoteData) => {
    console.log('Quote submitted:', quoteData);
    alert('Thank you! Your quote request has been submitted. We will contact you within 24 hours.');
    setCurrentPage('home');
  };

  const handleProceedToQuote = (cartData) => {
    setCurrentPage('quote');
  };

  // Render different pages
  if (currentPage === 'quote') {
    return <BulkQuote onBackToHome={handleBackToHome} onSubmitQuote={handleSubmitQuote} />;
  }

  if (currentPage === 'cart') {
    return (
      <CorporateCart
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        onBackToHome={handleBackToHome}
        onProceedToQuote={handleProceedToQuote}
      />
    );
  }

  // Main Home Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <B2BHeader 
        cart={cart} 
        onViewCart={handleViewCart}
        onRequestQuote={handleRequestQuote}
      />

      {/* Hero Section */}
      <section id="hero-section" className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Corporate Gifting
              <span className="block text-3xl lg:text-5xl mt-2">Made Simple</span>
            </h1>
                      <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Premium corporate gift sets with bulk pricing, custom branding, and nationwide delivery for businesses across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
              >
                <Gift className="w-5 h-5" />
                Browse Catalog
              </button>
              <button
                onClick={handleRequestQuote}
                className="border-2 border-white/30 hover:border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
     <section className="bg-white py-16 border-b">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      
      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          10+
        </div>
        <p className="text-gray-600 font-semibold">Corporate Clients</p>
      </div>

      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
          50+
        </div>
        <p className="text-gray-600 font-semibold">Orders Delivered</p>
      </div>

      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
          20% and more
        </div>
        <p className="text-gray-600 font-semibold">Bulk Discount</p>
      </div>

      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          25+
        </div>
        <p className="text-gray-600 font-semibold">Cities Served</p>
      </div>

    </div>
  </div>
</section>


      {/* Categories Section */}
      <section id="categories-section" className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Corporate Gift Categories
            </h2>
            <p className="text-gray-600 text-lg">Perfect solutions for every corporate gifting need</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl text-left transition-all transform hover:scale-105 hover:shadow-xl border-2 ${
                  selectedCategory === category.id 
                    ? 'border-blue-500 bg-white shadow-lg' 
                    : 'border-gray-200 bg-white/80 hover:border-blue-300'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
    <section id="products-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Corporate Gift Sets
            </h2>
            {/* <p className="text-gray-600 text-lg">
              {loading ? 'Loading...' : `Found ${filteredProducts.length} products`}
            </p> */}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={product.image?.url || '/api/placeholder/300/300'} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      B2B
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-green-600 font-bold text-xl">
                          ₹{product.bulkPrice || product.price}
                        </p>
                        <p className="text-gray-500 text-sm">per piece</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      <p>Category: {product.category}</p>
                      <p>Min. order: {product.minOrder || 25} pieces</p>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                    >
                      Add to Corporate Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No products found {selectedCategory !== 'all' ? `in ${selectedCategory} category` : ''}
              </p>
              {selectedCategory !== 'all' && (
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Show All Products
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Our B2B Services
            </h2>
            <p className="text-gray-600 text-lg">End-to-end corporate gifting solutions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Custom Branding</h3>
              <p className="text-gray-600">Logo printing and personalized packaging</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Pan-India Delivery</h3>
              <p className="text-gray-600">Free shipping for orders above ₹10,000</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Bulk Discounts</h3>
              <p className="text-gray-600">Up to 25% off on volume orders</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Account manager for corporate clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Corporate Gifting?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get customized quotes, volume discounts, and premium service for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRequestQuote}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Request Quote
            </button>
            <button
              onClick={handleViewCart}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer-section" className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Trazoo</h3>
              <p className="text-gray-400">
                Your trusted partner for premium corporate gifting solutions across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 9399007475
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@patelcorpgifts.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Pan-India Delivery
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-400 hover:text-white transition-colors">
                  Products
                </button>
                <button onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-400 hover:text-white transition-colors">
                  Categories
                </button>
                <button onClick={handleRequestQuote} className="block text-gray-400 hover:text-white transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Business Hours</h4>
              <div className="space-y-2 text-gray-400">
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat: 10:00 AM - 4:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Trazoo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}