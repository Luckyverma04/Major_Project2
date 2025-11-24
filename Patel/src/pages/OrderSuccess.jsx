import React from 'react';
import { CheckCircle, Package, Phone, Mail, Home } from 'lucide-react';

const OrderSuccess = ({ order, onBackToHome, onViewOrders }) => {
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No order information available</p>
          <button
            onClick={onBackToHome}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your order. We'll contact you shortly to confirm the details.
          </p>

          {/* Order Details */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="font-bold text-lg">{order.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="font-bold text-lg text-green-600">₹{order.totalAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="font-semibold">{order.paymentMethod.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Status</p>
                <p className="font-semibold capitalize">{order.orderStatus}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Shipping Address
            </h3>
            <div className="text-gray-700">
              <p className="font-semibold">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="mt-2">
                <Phone className="w-4 h-4 inline mr-2" />
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <img 
                    src={item.productImage || '/api/placeholder/60/60'} 
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-bold">₹{item.quantity * item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg mb-3 text-blue-900">What's Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                Our team will review your order within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                You'll receive a confirmation call on {order.shippingAddress.phone}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                We'll arrange delivery to your specified address
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                Track your order status in "My Orders" section
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onViewOrders}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              View My Orders
            </button>
            <button
              onClick={onBackToHome}
              className="flex-1 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 py-4 rounded-xl font-semibold transition-all"
            >
              <Home className="w-5 h-5 inline mr-2" />
              Back to Home
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t">
            <p className="text-gray-600 mb-2">Need help with your order?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="tel:+919399007475" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 9399007475
              </a>
              <a href="mailto:info@patelcorpgifts.com" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@patelcorpgifts.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;