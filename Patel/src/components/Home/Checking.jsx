import React, { useState, useEffect } from 'react';

import { ShoppingCart, Star, ArrowRight, Users, Award,
     Truck, Phone, Plus, Minus, X, CreditCard, MapPin, User, Mail, 
     Calendar, Building2, Gift, Package, Handshake, Calculator, 
     FileText, Clock, MessageCircle, Instagram, Facebook, Linkedin, Twitter, Sparkles, Zap, Shield,
      HeadphonesIcon, Menu } from 'lucide-react';
 const B2BHeader = ({ cart, onViewCart, onRequestQuote, onMenuToggle }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
 
   const toggleMenu = () => {
     const newMenuState = !isMenuOpen;
     setIsMenuOpen(newMenuState);
     // Call the callback to inform parent component about menu state change
     if (onMenuToggle) {
       onMenuToggle(newMenuState);
     }
   };
 
   const closeMenu = () => {
     setIsMenuOpen(false);
     // Inform parent that menu is closed
     if (onMenuToggle) {
       onMenuToggle(false);
     }
   };
 
   // Scroll to section function
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
             <span>TrazooGifts</span>
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
 const BulkQuote = ({ onBackToHome, onSubmitQuote }) => {
   const [quoteForm, setQuoteForm] = useState({
     companyName: '',
     contactPerson: '',
     email: '',
     phone: '',
     gstNumber: '',
     productCategory: '',
     quantity: '',
     customization: '',
     deliveryDate: '',
     message: ''
   });
 
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setQuoteForm(prev => ({ ...prev, [name]: value }));
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
     onSubmitQuote(quoteForm);
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
             <p className="text-gray-600 text-lg">Get customized pricing for your corporate gifting needs</p>
           </div>
 
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid md:grid-cols-2 gap-6">
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
                 />
               </div>
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
                   <option value="">Select Category</option>
                   <option value="employee-recognition">Employee Recognition Sets</option>
                   <option value="client-gifts">Client Appreciation Gifts</option>
                   <option value="festival-hampers">Festival Hampers</option>
                   <option value="welcome-kits">Welcome Kits</option>
                   <option value="custom-sets">Custom Gift Sets</option>
                 </select>
               </div>
               <div className="group">
                 <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                   Quantity Required *
                 </label>
                 <input
                   type="number"
                   name="quantity"
                   value={quoteForm.quantity}
                   onChange={handleInputChange}
                   min="25"
                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                   placeholder="Minimum 25 pieces"
                   required
                 />
               </div>
               <div className="group">
                 <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                   Delivery Date
                 </label>
                 <input
                   type="date"
                   name="deliveryDate"
                   value={quoteForm.deliveryDate}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                 />
               </div>
             </div>
             
             <div className="group">
               <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                 Customization Requirements
               </label>
               <textarea
                 name="customization"
                 value={quoteForm.customization}
                 onChange={handleInputChange}
                 rows="4"
                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 resize-none"
                 placeholder="Logo branding, custom packaging, personalized messages, etc."
               />
             </div>
 
             <div className="group">
               <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                 Additional Message
               </label>
               <textarea
                 name="message"
                 value={quoteForm.message}
                 onChange={handleInputChange}
                 rows="4"
                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 resize-none"
                 placeholder="Any specific requirements or questions..."
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
                       <img 
                         src={item.image} 
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
 export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation counters
  const [clientCount, startClientCount] = useCountUp(500);
  const [orderCount, startOrderCount] = useCountUp(25);
  const [discountCount, startDiscountCount] = useCountUp(15);
  const [cityCount, startCityCount] = useCountUp(28);
 

  useEffect(() => {
    // Start animations when component mounts
    const timer = setTimeout(() => {
      startClientCount();
      startOrderCount();
      startDiscountCount();
      startCityCount();
    }, 1000);
    return () => clearTimeout(timer);
  }, [startClientCount, startOrderCount, startDiscountCount, startCityCount]);

  // Backend connection and product fetching
  useEffect(() => {
    // Check backend connection
    fetch('http://localhost:5000/api/health')
      .then(response => response.json())
      .then(data => {
        setBackendStatus('connected');
        console.log('✅ Backend connected:', data);
      })
      .catch(error => {
        setBackendStatus('disconnected');
        console.error('❌ Backend connection failed:', error);
      });

    // Fetch products from backend
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
        console.log('✅ Products loaded from backend:', data.length, 'products');
      })
      .catch(error => {
        console.error('Error fetching products, using fallback data:', error);
        // Use fallback static data if backend fails
        setProducts(corporateGiftSets);
        setLoading(false);
      });
  }, []);
    const corporateGiftSets = [
    { 
      id: 1, 
      name: 'Executive Welcome Kit', 
      bulkPrice: 850, 
      retailPrice: 1200,
      category: 'welcome-kits', 
      image: '/api/placeholder/300/300', 
      rating: 4.8, 
      inStock: true, 
      bestseller: true,
      minOrder: 25,
      description: 'Premium welcome package for new hires',
      includes: ['Branded notebook', 'Metal pen', 'Coffee mug', 'Custom keychain']
    },
    { 
      id: 2, 
      name: 'Client Appreciation Hamper', 
      bulkPrice: 1250, 
      retailPrice: 1800,
      category: 'client-gifts', 
      image: '/api/placeholder/300/300', 
      rating: 4.9, 
      inStock: true, 
      bestseller: true,
      minOrder: 20,
      description: 'Luxury gift set to thank valued clients',
      includes: ['Premium chocolates', 'Branded bottle', 'Desktop organizer', 'Thank you card']
    },
    { 
      id: 3, 
      name: 'Employee Recognition Set', 
      bulkPrice: 450, 
      retailPrice: 650,
      category: 'employee-recognition', 
      image: '/api/placeholder/300/300', 
      rating: 4.6, 
      inStock: true,
      minOrder: 50,
      description: 'Perfect for acknowledging team achievements',
      includes: ['Certificate holder', 'Pen set', 'Badge', 'Congratulation card']
    },
    { 
      id: 4, 
      name: 'Diwali Corporate Hamper', 
      bulkPrice: 950, 
      retailPrice: 1400,
      category: 'festival-hampers', 
      image: '/api/placeholder/300/300', 
      rating: 4.7, 
      inStock: true,
      minOrder: 30,
      description: 'Traditional festival gift for business partners',
      includes: ['Dry fruits', 'Sweets box', 'Diya set', 'Custom greeting card']
    },
    { 
      id: 5, 
      name: 'Tech Professional Kit', 
      bulkPrice: 1150, 
      retailPrice: 1600,
      category: 'welcome-kits', 
      image: '/api/placeholder/300/300', 
      rating: 4.8, 
      inStock: true,
      minOrder: 25,
      description: 'Modern tech accessories for IT professionals',
      includes: ['Power bank', 'USB drive', 'Phone stand', 'Cable organizer']
    },
    { 
      id: 6, 
      name: 'Corporate Wellness Set', 
      bulkPrice: 750, 
      retailPrice: 1100,
      category: 'employee-recognition', 
      image: '/api/placeholder/300/300', 
      rating: 4.5, 
      inStock: true,
      minOrder: 40,
      description: 'Promote health and wellness in workplace',
      includes: ['Water bottle', 'Stress ball', 'Fitness band', 'Wellness guide']
    },
    { 
      id: 7, 
      name: 'Premium Business Hamper', 
      bulkPrice: 1850, 
      retailPrice: 2500,
      category: 'client-gifts', 
      image: '/api/placeholder/300/300', 
      rating: 4.9, 
      inStock: true,
      minOrder: 15,
      description: 'Luxury gifts for VIP clients and partners',
      includes: ['Premium pen set', 'Leather diary', 'Desk clock', 'Wine accessories']
    },
    { 
      id: 8, 
      name: 'New Year Corporate Set', 
      bulkPrice: 650, 
      retailPrice: 950,
      category: 'festival-hampers', 
      image: '/api/placeholder/300/300', 
      rating: 4.6, 
      inStock: true,
      minOrder: 35,
      description: 'Celebrate new beginnings with business associates',
      includes: ['Desktop calendar', 'Motivational book', 'Coffee beans', 'Custom card']
    },
  ];

  const categories = [
    { id: 'welcome-kits', name: 'Welcome Kits', icon: '🎁', description: 'New employee onboarding gifts', color: 'from-blue-400 to-purple-500' },
    { id: 'client-gifts', name: 'Client Appreciation', icon: '🤝', description: 'Strengthen business relationships', color: 'from-green-400 to-teal-500' },
    { id: 'employee-recognition', name: 'Employee Recognition', icon: '🏆', description: 'Reward and motivate teams', color: 'from-yellow-400 to-orange-500' },
    { id: 'festival-hampers', name: 'Festival Hampers', icon: '🪔', description: 'Seasonal corporate gifts', color: 'from-pink-400 to-red-500' },
  ];

const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.minOrder }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.minOrder }];
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    const product = cart.find(item => item.id === productId);
    if (!product) return;
    
    if (newQuantity < product.minOrder) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Navigation Functions
  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleViewCart = () => {
    setCurrentPage('cart');
  };

  const handleRequestQuote = () => {
    setCurrentPage('quote');
  };

  const handleProceedToQuote = (summary) => {
    setCurrentPage('quote');
  };

  const handleSubmitQuote = async (quoteData) => {
    try {
      const response = await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('✅ Quote request submitted successfully! We\'ll contact you within 24 hours with customized pricing.');
        setCurrentPage('home');
      } else {
        alert(`❌ ${result.message || 'Failed to submit quote. Please try again.'}`);
      }
    } catch (error) {
      console.error('Quote submission error:', error);
      alert('⚠️ Network error. Please try again or contact us directly at +91 9399007475');
    }
  };
   // Scroll functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Page Routing
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

  if (currentPage === 'quote') {
    return (
      <BulkQuote 
        onBackToHome={handleBackToHome}
        onSubmitQuote={handleSubmitQuote}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Backend Status Indicator */}
      {backendStatus === 'checking' && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm z-50">
          🔄 Connecting to backend...
        </div>
      )}
      {backendStatus === 'disconnected' && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm z-50">
          ❌ Backend offline - using demo data
        </div>
      )}

      {/* Integrated B2B Header */}
      <B2BHeader 
        cart={cart}
        onViewCart={handleViewCart}
        onRequestQuote={handleRequestQuote}
      />

      {/* Enhanced B2B Hero Section */}
      <div id="hero-section" className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden"> <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm border border-yellow-400/30">
                    <Sparkles className="w-4 h-4" />
                    India's #1 B2B Corporate Gifting Platform
                  </span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                  Corporate Gifting
                  <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                    Made Simple
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                  🚀 Strengthen business relationships with <span className="font-bold text-yellow-300">premium corporate gift sets</span>. 
                  Bulk orders, custom branding, and nationwide delivery for businesses across India.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                  <button 
                    onClick={() => scrollToSection('categories-section')}
                    className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-5 rounded-2xl text-xl font-black transition-all transform hover:scale-105 shadow-2xl hover:shadow-yellow-400/25"
                  >
                    <span className="flex items-center justify-center gap-3">
                      🎁 Browse Corporate Catalog
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button 
                    onClick={handleRequestQuote}
                    className="border-3 border-white hover:bg-white hover:text-blue-900 px-10 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Calculator className="w-6 h-6" />
                      Get Bulk Quote
                    </span>
                  </button>
                </div>
                
                {/* Enhanced Quick Stats with Animations */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                    <div className="text-4xl font-black mb-2 text-yellow-300">{clientCount}+</div>
                    <div className="text-sm text-blue-200 font-medium">Corporate Clients</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                    <div className="text-4xl font-black mb-2 text-green-300">{orderCount}+</div>
                    <div className="text-sm text-blue-200 font-medium">Min. Order (pieces)</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                      <div className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                    <div className="text-4xl font-black mb-2 text-purple-300">{discountCount}%</div>
                    <div className="text-sm text-blue-200 font-medium">Volume Discounts</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                    <div className="text-4xl font-black mb-2 text-pink-300">{cityCount}+</div>
                    <div className="text-sm text-blue-200 font-medium">Cities Served</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                      <div className="bg-gradient-to-r from-pink-400 to-red-500 h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Enhanced B2B Features Section */}
            <div className="py-20 bg-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50"></div>
              <div className="relative max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
                    Why Choose Us
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                    Why Businesses 
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Choose Us</span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Complete B2B corporate gifting solutions with unmatched service quality
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Building2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Bulk Orders</h3>
                    <p className="text-gray-600 leading-relaxed">Minimum 25 pieces with volume discounts up to 15%</p>
                  </div>
                  <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Gift className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Custom Branding</h3>
                    <p className="text-gray-600 leading-relaxed">Logo printing, custom packaging, and personalized cards</p>
                  </div>
                  <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Truck className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Pan-India Delivery</h3>
                    <p className="text-gray-600 leading-relaxed">Reliable corporate delivery network across all major cities</p>
                  </div>
                  <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Handshake className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
                    <p className="text-gray-600 leading-relaxed">Account managers and 24/7 business support</p>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Enhanced Corporate Categories Section */}
            <div id="categories-section" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-16 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
                    Gift Categories
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                    Corporate Gift 
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Categories</span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Curated gift sets for every business occasion and relationship
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  {categories.map(category => (
                    <div 
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group p-8 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                        selectedCategory === category.id 
                          ? `bg-gradient-to-br ${category.color} text-white shadow-2xl scale-105` 
                          : 'bg-white hover:shadow-xl border border-gray-200'
                      }`}
                    >
                      <div className={`text-6xl mb-6 transition-transform group-hover:scale-110 ${
                        selectedCategory === category.id ? 'animate-bounce' : ''
                      }`}>
                        {category.icon}
                      </div>
                      <h3 className={`font-bold text-xl mb-3 ${
                        selectedCategory === category.id ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category.name}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        selectedCategory === category.id ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {category.description}
                      </p>
                      {selectedCategory === category.id && (
                        <div className="mt-4 flex items-center justify-center">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            SELECTED
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
 {/* Enhanced Corporate Gift Sets Section */}
      <div id="products-section" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
              Premium Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {selectedCategory === 'all' ? (
                <>Popular Corporate <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Gift Sets</span></>
              ) : (
                <>{categories.find(cat => cat.id === selectedCategory)?.name || 'Gift Sets'}</>
              )}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium curated sets with bulk pricing and custom branding options
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      🔥 Bestseller
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    B2B
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Rating and Minimum Order */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-bold">
                      Min: {product.minOrder} pcs
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                  {/* What's Included */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-700 mb-2">📦 Package Includes:</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      {product.includes.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          {item}
                        </div>
                      ))}
                      {product.includes.length > 2 && (
                        <div className="text-blue-600 font-medium">
                          +{product.includes.length - 2} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Retail Price:</span>
                      <span className="text-sm line-through text-gray-400">₹{product.retailPrice}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Bulk Price:</span>
                      <span className="text-2xl font-black text-green-600">₹{product.bulkPrice}</span>
                    </div>
                    <div className="text-center">
                      <span className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                        💰 Save ₹{product.retailPrice - product.bulkPrice} per piece
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
                  >
                    <Package className="w-4 h-4" />
                    Add {product.minOrder} pieces to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 max-w-5xl mx-auto border border-white/50 shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">
                Need Custom Corporate Solutions?
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-3xl mx-auto leading-relaxed">
                We specialize in custom corporate gift sets, branded merchandise, and bulk orders 
                for businesses of all sizes. Get personalized quotes and dedicated account management.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={handleRequestQuote}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 hover:shadow-xl"
                >
                  <Calculator className="w-6 h-6" />
                  Request Custom Quote
                </button>
                <button className="border-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105">
                  📋 Download Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Corporate Services Section */}
      <div id="services-section" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
              Complete Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Complete B2B 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end corporate gifting solutions for every business need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Award, color: 'from-blue-400 to-blue-600', title: 'Employee Recognition Programs', desc: 'Motivate and reward your team with premium recognition gift sets and achievement packages.' },
              { icon: Handshake, color: 'from-green-400 to-green-600', title: 'Client Relationship Building', desc: 'Strengthen business partnerships with thoughtfully curated appreciation gifts and hampers.' },
              { icon: Package, color: 'from-purple-400 to-purple-600', title: 'Corporate Events & Conferences', desc: 'Welcome kits, giveaways, and branded merchandise for corporate events and conferences.' },
              { icon: Gift, color: 'from-orange-400 to-orange-600', title: 'Seasonal Corporate Campaigns', desc: 'Festival hampers and holiday gifts for Diwali, New Year, and other special occasions.' },
              { icon: Users, color: 'from-indigo-400 to-indigo-600', title: 'Onboarding & Welcome Packages', desc: 'First impression gift sets for new employees, clients, and business partners.' },
              { icon: Building2, color: 'from-teal-400 to-teal-600', title: 'Corporate Branding Solutions', desc: 'Custom logo printing, branded packaging, and personalized corporate merchandise.' }
            ].map((service, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced About Section - B2B Focused */}
      <div id="about-section" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Your Trusted B2B 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Corporate Gifting Partner
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                TrazooProducts has evolved into India's leading B2B corporate gifting solutions provider. 
                With over 2 years of business experience and three generations of expertise, we understand 
                what makes corporate gifting meaningful and effective for businesses.
              </p>
              <div className="space-y-6">
                {[
                  { text: '500+ Corporate clients across India', color: 'bg-green-500' },
                  { text: 'Volume discounts up to 15% on bulk orders', color: 'bg-blue-500' },
                  { text: 'Custom branding and packaging services', color: 'bg-purple-500' },
                  { text: 'Dedicated account management', color: 'bg-orange-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 font-medium text-lg group-hover:text-gray-900 transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-12 rounded-3xl shadow-2xl border border-white/50">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="group">
                    <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                      500+
                    </div>
                    <div className="text-gray-600 font-medium">Corporate Clients</div>
                    <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                      50K+
                    </div>
                    <div className="text-gray-600 font-medium">Gift Sets Delivered</div>
                    <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="text-5xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                      28+
                    </div>
                    <div className="text-gray-600 font-medium">Cities Served</div>
                    <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                      98%
                    </div>
                    <div className="text-gray-600 font-medium">Client Retention</div>
                    <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action Section - B2B Focus */}
      <div className="py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm border border-yellow-400/30">
              <Zap className="w-4 h-4" />
              Ready to Get Started?
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Ready to Strengthen Your 
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Business Relationships?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            🚀 Partner with India's trusted corporate gifting experts. Get bulk pricing, 
            custom branding, and dedicated support for all your business gifting needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={handleRequestQuote}
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-12 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-yellow-400/25"
            >
              <span className="flex items-center justify-center gap-3">
                <Calculator className="w-6 h-6" />
                Get Bulk Quote Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="group border-3 border-white hover:bg-white hover:text-blue-900 px-12 py-5 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 backdrop-blur-sm">
              <span className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                Call: +91 9399007475
              </span>
            </button>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-blue-400/30">
            <div className="group text-center">
              <div className="w-16 h-16 bg-yellow-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-yellow-400/30">
                <Clock className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="font-bold text-lg mb-2">Quick Turnaround</div>
              <div className="text-blue-200 text-sm">5-7 business days delivery nationwide</div>
            </div>
            <div className="group text-center">
              <div className="w-16 h-16 bg-green-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-green-400/30">
                <FileText className="w-8 h-8 text-green-300" />
              </div>
              <div className="font-bold text-lg mb-2">GST Invoicing</div>
              <div className="text-blue-200 text-sm">Proper B2B documentation & compliance</div>
            </div>
            <div className="group text-center">
              <div className="w-16 h-16 bg-purple-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-purple-400/30">
                <Shield className="w-8 h-8 text-purple-300" />
              </div>
              <div className="font-bold text-lg mb-2">Quality Guarantee</div>
              <div className="text-blue-200 text-sm">100% satisfaction assured or money back</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer Section */}
      <footer id="footer-section" className="bg-gray-900 text-white py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    TrazooGifts
                  </h3>
                  <p className="text-xs text-gray-400">B2B Solutions</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                India's leading B2B corporate gifting platform. 50+ years of experience in strengthening business relationships through thoughtful gifting.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6">Corporate Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Bulk Gift Sets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Branding</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Employee Recognition</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Client Appreciation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Festival Hampers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Welcome Kits</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Get Quote</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bulk Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Account Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">+91 9399007475</p>
                    <p className="text-xs">24/7 Business Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">corp@patelgifts.com</p>
                    <p className="text-xs">B2B Inquiries</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="font-medium text-white">Mumbai, India</p>
                    <p className="text-xs">Pan-India Delivery</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-800/50 to-blue-800/50 rounded-xl border border-green-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <HeadphonesIcon className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-green-400">Enterprise Support</span>
                </div>
                <p className="text-xs text-gray-300">Dedicated account managers for bulk orders</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 TrazooGifts. All rights reserved. | GST: 27XXXXX1234X1ZX
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">B2B Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <button
          onClick={handleRequestQuote}
          className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all transform hover:scale-110"
        >
          <Calculator className="w-6 h-6" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Get Quote
          </span>
        </button>
        
        <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-110">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat Support
          </span>
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}