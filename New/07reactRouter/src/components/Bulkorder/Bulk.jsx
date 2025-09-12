import React, { useState } from 'react';
import { Package, Calculator, Users, Phone, Mail, CheckCircle, ArrowRight, FileText } from 'lucide-react';

const BulkOrderPage = () => {
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

  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    { id: 1, name: 'Industrial Components', basePrice: 50000, unit: 'pieces', minOrder: 100 },
    { id: 2, name: 'Electronic Solutions', basePrice: 25000, unit: 'units', minOrder: 50 },
    { id: 3, name: 'Machinery Parts', basePrice: 75000, unit: 'pieces', minOrder: 25 },
    { id: 4, name: 'Raw Materials', basePrice: 15000, unit: 'kg', minOrder: 500 }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductSelect = (product) => {
    const exists = selectedProducts.find(p => p.id === product.id);
    if (!exists) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: product.minOrder }]);
    }
  };

  const updateProductQuantity = (productId, quantity) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.id === productId ? { ...p, quantity: parseInt(quantity) || 0 } : p
    ));
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      return total + (product.basePrice * product.quantity);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bulk Order Submitted:', { formData, selectedProducts, total: calculateTotal() });
    alert('Bulk order request submitted! We will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bulk Order Request
          </h1>
          <p className="text-xl text-blue-100">Get wholesale pricing for large quantity orders</p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Package, title: 'Wholesale Pricing', desc: 'Up to 40% discount on bulk orders' },
            { icon: Calculator, title: 'Custom Quotes', desc: 'Tailored pricing for your needs' },
            { icon: Users, title: 'Dedicated Support', desc: 'Personal account manager' },
            { icon: FileText, title: 'Flexible Terms', desc: 'Customized payment options' }
          ].map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
              <benefit.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
              <p className="text-blue-200 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Selection */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Select Products
            </h2>
            
            <div className="space-y-4 mb-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-semibold">{product.name}</h3>
                      <p className="text-blue-200 text-sm">₹{product.basePrice.toLocaleString()} per {product.unit}</p>
                      <p className="text-blue-300 text-xs">Min Order: {product.minOrder} {product.unit}</p>
                    </div>
                    <button
                      onClick={() => handleProductSelect(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Products */}
            {selectedProducts.length > 0 && (
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-white font-semibold mb-4">Selected Products:</h3>
                <div className="space-y-3">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{product.name}</span>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-blue-200 text-sm">Quantity:</label>
                          <input
                            type="number"
                            value={product.quantity}
                            min={product.minOrder}
                            onChange={(e) => updateProductQuantity(product.id, e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white w-24 text-sm"
                          />
                          <span className="text-blue-200 text-sm">{product.unit}</span>
                        </div>
                        <div className="text-white font-semibold">
                          ₹{(product.basePrice * product.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-white/20 pt-3">
                    <div className="text-right text-xl font-bold text-white">
                      Total: ₹{calculateTotal().toLocaleString()}
                    </div>
                    <div className="text-right text-blue-200 text-sm">
                      *Final price subject to negotiation
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Request Quote
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Submit Bulk Order Request
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-4 text-blue-200 text-sm">
                <Phone className="w-4 h-4" />
                <span>Call: +91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-4 text-blue-200 text-sm mt-2">
                <Mail className="w-4 h-4" />
                <span>Email: bulk@patelproducts.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Submit Request', desc: 'Fill out the bulk order form' },
              { step: '2', title: 'Quote Review', desc: 'We review and prepare custom pricing' },
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