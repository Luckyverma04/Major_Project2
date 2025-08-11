import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Building, Wallet, Lock, Shield, CheckCircle, ArrowLeft, Info, Plus, Minus, Trash2 } from 'lucide-react';

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Billing Details
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Card Details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // UPI Details
    upiId: '',
    
    // Net Banking
    bankName: '',
  });

  // Dynamic cart items with state management
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Cotton College T-Shirt', price: 299, quantity: 2, size: 'L' },
    { id: 2, name: 'Premium Backpack', price: 899, quantity: 1 },
    { id: 3, name: 'Gel Pen Set', price: 199, quantity: 1 },
  ]);

  // Dynamic pricing calculations
  const [pricing, setPricing] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });

  // Calculate pricing whenever cart items change
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + tax;

    setPricing({ subtotal, shipping, tax, total });
  }, [cartItems]);

  // Cart management functions
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addItem = (newItem) => {
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      updateQuantity(newItem.id, existingItem.quantity + 1);
    } else {
      setCartItems(prevItems => [...prevItems, { ...newItem, quantity: 1 }]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    e.target.value = formatCardNumber(e.target.value);
    handleInputChange(e);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
    handleInputChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    // Payment method specific validation
    if (selectedPayment === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
        alert('Please fill in all card details.');
        return;
      }
    } else if (selectedPayment === 'upi') {
      if (!formData.upiId) {
        alert('Please enter your UPI ID.');
        return;
      }
    } else if (selectedPayment === 'netbanking') {
      if (!formData.bankName) {
        alert('Please select your bank.');
        return;
      }
    }

    console.log('Processing payment with method:', selectedPayment);
    console.log('Form data:', formData);
    console.log('Cart items:', cartItems);
    console.log('Total amount:', pricing.total);
    
    // Simulate order processing
    alert(`Order placed successfully! Payment method: ${selectedPayment}, Total: ₹${pricing.total.toLocaleString()}`);
  };

  // Sample items that can be added to cart
  const availableItems = [
    { id: 4, name: 'Notebook Set', price: 149 },
    { id: 5, name: 'Water Bottle', price: 299 },
    { id: 6, name: 'College Hoodie', price: 699, size: 'M' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Items Section (Demo) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-green-600" />
                Add More Items
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {availableItems.map(item => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    <p className="text-lg font-semibold text-blue-600 mt-2">₹{item.price}</p>
                    <button
                      onClick={() => addItem(item)}
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Billing Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="400001"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="House/Flat No., Street, Area, Landmark"
                ></textarea>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mumbai"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="MH">Maharashtra</option>
                    <option value="DL">Delhi</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="GJ">Gujarat</option>
                    <option value="KA">Karnataka</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="WB">West Bengal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Payment Method
              </h2>
              
              {/* Payment Options */}
              <div className="space-y-4 mb-6">
                {/* Card Payment */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === 'card'}
                      onChange={() => setSelectedPayment('card')}
                      className="mr-3"
                    />
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Pay securely with your card</p>
                </div>

                {/* UPI Payment */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={selectedPayment === 'upi'}
                      onChange={() => setSelectedPayment('upi')}
                      className="mr-3"
                    />
                    <Smartphone className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">UPI Payment</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Pay using Google Pay, PhonePe, Paytm</p>
                </div>

                {/* Net Banking */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('netbanking')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={selectedPayment === 'netbanking'}
                      onChange={() => setSelectedPayment('netbanking')}
                      className="mr-3"
                    />
                    <Building className="w-5 h-5 mr-2 text-purple-600" />
                    <span className="font-medium">Net Banking</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Pay directly from your bank account</p>
                </div>

                {/* Cash on Delivery */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('cod')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedPayment === 'cod'}
                      onChange={() => setSelectedPayment('cod')}
                      className="mr-3"
                    />
                    <Wallet className="w-5 h-5 mr-2 text-orange-600" />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Pay when you receive your order</p>
                </div>
              </div>

              {/* Payment Details Forms */}
              {selectedPayment === 'card' && (
                <div className="border-t pt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        maxLength="19"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        maxLength="5"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        maxLength="3"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Name as on card"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === 'upi' && (
                <div className="border-t pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="yourname@paytm"
                  />
                </div>
              )}

              {selectedPayment === 'netbanking' && (
                <div className="border-t pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Bank *
                  </label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {selectedPayment === 'cod' && (
                <div className="border-t pt-6">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-800">Cash on Delivery</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          You will pay ₹{pricing.total.toLocaleString()} when you receive your order. 
                          Please keep exact change ready for smooth delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <button
                  onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
                  className="lg:hidden text-blue-600 hover:text-blue-700"
                >
                  {orderSummaryOpen ? 'Hide' : 'Show'} Details
                </button>
              </div>

              <div className={`space-y-4 ${orderSummaryOpen ? 'block' : 'hidden lg:block'}`}>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">Add items to continue</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-3">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-start border-b pb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                            <div className="text-xs text-gray-500 mt-1">
                              {item.size && <span>Size: {item.size} • </span>}
                              <span>₹{item.price} each</span>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-50"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 h-6 flex items-center justify-center border-t border-b border-gray-300 text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-2 p-1 text-red-600 hover:text-red-700"
                                title="Remove item"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <span className="font-medium text-gray-900 ml-2">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <hr />

                    {/* Price Breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span>₹{pricing.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className={pricing.shipping === 0 ? 'text-green-600' : ''}>
                          {pricing.shipping === 0 ? 'Free' : `₹${pricing.shipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">GST (18%)</span>
                        <span>₹{pricing.tax.toLocaleString()}</span>
                      </div>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{pricing.total.toLocaleString()}</span>
                    </div>

                    {pricing.shipping === 0 && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Free shipping applied!</span>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Security Badge */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600">
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="text-sm">Secure 256-bit SSL encryption</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handleSubmit}
                  disabled={cartItems.length === 0}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center ${
                    cartItems.length === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  {cartItems.length === 0 
                    ? 'Add Items to Continue' 
                    : `Place Order - ₹${pricing.total.toLocaleString()}`
                  }
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}