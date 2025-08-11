import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, CreditCard, Truck, Shield, Headphones } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                <span className="text-xl font-bold">PP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Patel Products</h3>
                <p className="text-gray-400 text-sm">Quality Products for Everyone</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted family business for quality products at affordable prices. 
              Serving customers across India with personal care and reliable service.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">D53, Palnagar, MP, 455001</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="tel:+919399007475" className="text-sm hover:text-blue-400 transition-colors">
                  +91 9399007475
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="mailto:info@patelproducts.com" className="text-sm hover:text-blue-400 transition-colors">
                  info@patelproducts.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">Quick Links</h4>
            <nav className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Home
              </a>
              <a href="/shop" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Shop All Products
              </a>
              <a href="/categories" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Categories
              </a>
              <a href="/bulk-orders" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Bulk Orders
              </a>
              <a href="/about" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                About Us
              </a>
              <a href="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Contact Us
              </a>
              <a href="/track-order" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Track Your Order
              </a>
            </nav>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">Categories</h4>
            <nav className="space-y-2">
              <a href="/category/clothing" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                T-Shirts & Shirts
              </a>
              <a href="/category/bags" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Bags & Backpacks
              </a>
              <a href="/category/accessories" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Accessories
              </a>
              <a href="/category/stationery" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Stationery & Pens
              </a>
              <a href="/category/bottles" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Bottles & Drinkware
              </a>
              <a href="/category/id-cards" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                ID Cards & Holders
              </a>
              <a href="/category/keychains" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Keychains & Caps
              </a>
            </nav>
          </div>

          {/* Customer Service & Business Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">Customer Service</h4>
            
            {/* Business Hours
            <div className="space-y-2">
              <div className="flex items-center text-gray-300 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Business Hours</span>
              </div>
              <div className="text-xs text-gray-400 space-y-1 ml-6">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </div> */}

            {/* Customer Service Links */}
            <nav className="space-y-2">
              <a href="/help" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Help & Support
              </a>
              <a href="/shipping" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Shipping Info
              </a>
              <a href="/returns" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Returns & Exchanges
              </a>
              <a href="/size-guide" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Size Guide
              </a>
              <a href="/faq" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                FAQ
              </a>
            </nav>

            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-sm font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Stay Updated with Our Latest Products</h4>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Get notified about new products, offers, and bulk order discounts.
            </p>
          </div>
        </div>

        {/* Features Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-600 p-3 rounded-full">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Fast Delivery</h5>
                <p className="text-gray-400 text-xs">With extra Charges</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-600 p-3 rounded-full">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Quality Guaranteed</h5>
                <p className="text-gray-400 text-xs">Premium products</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-purple-600 p-3 rounded-full">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-medium text-sm">24/7 Support</h5>
                <p className="text-gray-400 text-xs">Always here to help</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-orange-600 p-3 rounded-full">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Secure Payment</h5>
                <p className="text-gray-400 text-xs">Safe & secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; {currentYear} Patel Products. All rights reserved.</p>
              <p>Family-owned business serving customers with quality products since 2014.</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex space-x-4">
                <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="/refund" className="hover:text-blue-400 transition-colors">Refund Policy</a>
              </div>
              
              <div className="flex items-center space-x-2 text-xs">
                <span>Powered by:</span>
                <span className="font-medium">Patel Products Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}