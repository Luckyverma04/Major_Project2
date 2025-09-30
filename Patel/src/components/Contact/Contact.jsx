import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // You can add your form submission logic here
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Patel Products</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you! Get in touch with our family business for any inquiries, 
                        product information, or support needs.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Have questions about our products or need assistance? Our family team is here to help! 
                                Reach out to us through any of the following ways.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Visit Our Store</h3>
                                    <p className="text-gray-600">D53, Palnagar, MP, 455001</p>
                                    <p className="text-sm text-gray-500 mt-1">Open Monday to Saturday, 9 AM - 8 PM</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                                    <p className="text-gray-600">+91 9399007475</p>
                                    <p className="text-sm text-gray-500 mt-1">Available 7 days a week, 8 AM - 10 PM</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600">lv001490@gmail.com</p>
                                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Live Chat</h3>
                                    <p className="text-gray-600">Chat with our support team</p>
                                    <button className="text-sm text-indigo-600 hover:text-indigo-700 mt-1">
                                        Start Chat →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Clock className="w-5 h-5 text-gray-600 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monday - Friday:</span>
                                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Saturday:</span>
                                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sunday:</span>
                                    <span className="font-medium text-orange-600">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white">
                        <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Inquiry Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        What can we help you with?
                                    </label>
                                    <select
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        className="w-full py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="product">Product Information</option>
                                        <option value="order">Order Support</option>
                                        <option value="wholesale">Wholesale/Bulk Orders</option>
                                        <option value="complaint">Complaint/Issue</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className="w-full py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Your phone number"
                                            className="w-full py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="lv001490@gmail.com"
                                        className="w-full py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Brief subject of your message"
                                        className="w-full py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help you..."
                                        className="w-full py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Send Message</span>
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    We'll get back to you within 24 hours. For urgent matters, please call us directly.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer wholesale pricing?</h3>
                            <p className="text-gray-600 text-sm">Yes! We offer special pricing for bulk orders and wholesale customers. Contact us for a custom quote.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's your return policy?</h3>
                            <p className="text-gray-600 text-sm">We offer a 30-day return policy for unused items in original condition. Customer satisfaction is our priority.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you ship nationwide?</h3>
                            <p className="text-gray-600 text-sm">Yes, we ship across India. Free shipping on orders above ₹999. Express delivery available for major cities.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I track my order?</h3>
                            <p className="text-gray-600 text-sm">Absolutely! Once your order ships, you'll receive a tracking number to monitor your delivery status.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}