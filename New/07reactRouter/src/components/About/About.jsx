import React from "react";
import { Award, Users, Heart, Clock, Star, Truck } from "lucide-react";

export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                {/* Main About Section */}
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 mb-16">
                    <div className="md:w-5/12 lg:w-5/12">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=500&fit=crop"
                            alt="Patel Products family business"
                            className="w-full rounded-2xl shadow-lg"
                />
                    </div>
                    <div className="md:w-7/12 lg:w-6/12">
                        <h1 className="text-3xl text-gray-900 font-bold md:text-5xl mb-6">
                            The Patel Family Legacy
                        </h1>
                        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                            Welcome to Patel Products, a family-owned business that has been serving customers with 
                            quality products for over three generations. What started as a small local shop has grown 
                            into a trusted brand known for excellence and reliability.
                        </p>
                        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                            Our commitment to quality, traditional craftsmanship, and customer satisfaction has been 
                            the cornerstone of our success. Every product we offer is carefully selected and tested 
                            to meet the high standards that the Patel name represents.
                        </p>
                        
                        <div className="mt-8">
                            <button
                                onClick={() => window.location.href = "/#featured-products"}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Explore Our Products
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Our Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
                            <p className="text-gray-600 mb-4">Every product undergoes rigorous quality checks to ensure it meets our family standards</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Premium Materials</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tested Products</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Certified Quality</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Family Values</h3>
                            <p className="text-gray-600 mb-4">Treating every customer like family with personal care and attention</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Personal Service</span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Trust</span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Reliability</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Care</h3>
                            <p className="text-gray-600 mb-4">Your satisfaction is our priority, backed by excellent after-sales support</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">24/7 Support</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Easy Returns</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Lifetime Care</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Statistics */}
                <div className="mb-16 bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Achievement in Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
                            <div className="text-gray-600">Years in Business</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
                            <div className="text-gray-600">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
                            <div className="text-gray-600">Products Available</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
                            <div className="text-gray-600">Customer Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* Our Story Timeline */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">1970s - The Beginning</h3>
                                    <p className="text-gray-600">
                                        Started as a small family shop by Mr. Ramesh Patel with just a few essential products. 
                                        The focus was on building trust in the local community through quality and fair prices.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Truck className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">1990s - Expansion Era</h3>
                                    <p className="text-gray-600">
                                        Under the leadership of the second generation, we expanded our product range and 
                                        started serving customers across multiple cities. Quality remained our top priority.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Star className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">2020s - Digital Transformation</h3>
                                    <p className="text-gray-600">
                                        Today, the third generation has brought Patel Products online, combining traditional 
                                        values with modern technology to serve customers nationwide while maintaining the same 
                                        family care and attention to quality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience the Patel Difference</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join our family of satisfied customers and discover why three generations have trusted Patel Products 
                        for quality, reliability, and exceptional service.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.href = "/#featured-products"}
                            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Shop Now
                        </button>
                        <button
                            onClick={() => window.location.href = "/contact"}
                            className="inline-flex items-center justify-center px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}