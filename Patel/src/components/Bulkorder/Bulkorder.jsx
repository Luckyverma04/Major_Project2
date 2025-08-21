import React, { useState } from 'react';
import { Package, Calculator, Users, Phone, Mail, CheckCircle, ArrowRight, FileText, ShoppingCart, Minus, Plus, X } from 'lucide-react';

// Corporate Cart Component
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
                  <div key={item.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-md flex items-center justify-center text-3xl">
                        {item.emoji}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">B2B</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-green-600 font-bold text-lg">₹{item.bulkPrice} per piece</p>
                      <p className="text-sm text-gray-500">Min. order: {item.minOrder} pieces</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartQuantity(item.id, Math.max(item.minOrder, item.quantity - 1))}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all transform hover:scale-105"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 flex items-center justify-center transition-all transform hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">₹{item.bulkPrice * item.quantity}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
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

// Main Bulk Order Page Component
const BulkOrderPage = () => {
  const [currentView, setCurrentView] = useState('catalog'); // 'catalog', 'cart', 'quote'
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    deliveryDate: '',
    specialRequirements: ''
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      updateCartQuantity(product.id, existingItem.quantity + product.minOrder);
    } else {
      setCart([...cart, { ...product, quantity: product.minOrder }]);
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    const product = products.find(p => p.id === productId);
    const validQuantity = Math.max(product.minOrder, newQuantity);
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: validQuantity } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleProceedToQuote = (orderSummary) => {
    setCurrentView('quote');
  };

  const handleSubmit = () => {
    console.log('Bulk Order Submitted:', { formData, cart, total: cart.reduce((total, item) => total + (item.bulkPrice * item.quantity), 0) });
    alert('Bulk order request submitted! We will contact you within 24 hours.');
  };

  // Cart View
  if (currentView === 'cart') {
    return (
      <CorporateCart 
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        onBackToHome={() => setCurrentView('catalog')}
        onProceedToQuote={handleProceedToQuote}
      />
    );
  }

  // Quote View
  if (currentView === 'quote') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <button 
              onClick={() => setCurrentView('cart')}
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold mb-4"
            >
              ← Back to Cart
            </button>
            <h1 className="text-4xl font-bold text-white mb-4">Request Quote</h1>
            <p className="text-blue-200">Provide your details to get a customized quote</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Company Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="company@example.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Required Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific requirements, customizations, or questions..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Submit Quote Request
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Catalog View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1"></div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bulk Order Request
            </h1>
            <div className="flex-1 flex justify-end">
              <button 
                onClick={() => setCurrentView('cart')}
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart ({cart.length})
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          <p className="text-xl text-blue-100">Get wholesale pricing for corporate orders - T-shirts, bags, stationery & more!</p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Package, title: 'Wholesale Pricing', desc: 'Up to 35% discount on bulk orders' },
            { icon: Calculator, title: 'Custom Quotes', desc: 'Tailored pricing for your needs' },
            { icon: Users, title: 'Custom Branding', desc: 'Add your logo to any product' },
            { icon: FileText, title: 'Flexible MOQs', desc: 'Minimum order quantities from 10-200 pieces' }
          ].map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
              <benefit.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
              <p className="text-blue-200 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Product Catalog */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Package className="w-6 h-6" />
            Product Catalog
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-3 block">{product.emoji}</span>
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <div className="space-y-1">
                    <p className="text-gray-300 text-sm line-through">₹{product.basePrice.toLocaleString()}</p>
                    <p className="text-green-400 font-bold text-lg">₹{product.bulkPrice.toLocaleString()} bulk</p>
                    <p className="text-blue-300 text-xs">Min Order: {product.minOrder} {product.unit}</p>
                    <span className="inline-block bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                      {product.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Add to Cart', desc: 'Select products and quantities' },
              { step: '2', title: 'Get Quote', desc: 'Review pricing and submit details' },
              { step: '3', title: 'Negotiation', desc: 'Discuss terms and finalize details' },
              { step: '4', title: 'Order Fulfillment', desc: 'Production and delivery as agreed' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-blue-200 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderPage;