import React from "react";
import { Building2, Gift, Users, Handshake, Award, TrendingUp, Package, Clock } from "lucide-react";

export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                {/* Main About Section */}
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 mb-16">
                    <div className="md:w-5/12 lg:w-5/12">
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                            alt="Corporate gifting solutions by TrazooProducts"
                            className="w-full rounded-2xl shadow-lg"
                        />
                    </div>
                    <div className="md:w-7/12 lg:w-6/12">
                        <h1 className="text-3xl text-gray-900 font-bold md:text-5xl mb-6">
                            Your Trusted B2B Corporate Gifting Partner
                        </h1>
                        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                            Trazoo Products has evolved from a family business into India's leading B2B corporate gifting 
                            solutions provider. We help businesses strengthen relationships through thoughtfully curated 
                            gift sets and premium corporate hampers.
                        </p>
                        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                            With over 50 years of trust and three generations of expertise, we understand what makes 
                            corporate gifting meaningful. From employee recognition to client appreciation, we deliver 
                            excellence in every package.
                        </p>
                        
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => window.location.href = "/#products-section"}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                            >
                                View Corporate Catalog
                                <Package className="ml-2 w-5 h-5" />
                            </button>
                            <button
                                onClick={() => window.location.href = "/#bulk-quote"}
                                className="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
                            >
                                Request Bulk Quote
                            </button>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us for Corporate Gifting */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Businesses Choose TrazooProducts</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">B2B Expertise</h3>
                            <p className="text-gray-600 mb-4">Specialized in corporate bulk orders with dedicated account management and business-focused solutions</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Bulk Orders</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Volume Discounts</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">GST Invoicing</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Branding</h3>
                            <p className="text-gray-600 mb-4">Complete customization with your company logo, colors, and personalized packaging for every gift set</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Logo Branding</span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Custom Packaging</span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Personalized Cards</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Handshake className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Relationship Building</h3>
                            <p className="text-gray-600 mb-4">Thoughtfully curated gifts that strengthen business relationships and leave lasting impressions</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Client Gifts</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Employee Recognition</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Festival Hampers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corporate Statistics */}
                <div className="mb-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Trusted by Businesses Nationwide</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                            <div className="text-gray-600">Corporate Clients</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
                            <div className="text-gray-600">Gift Sets Delivered</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
                            <div className="text-gray-600">Cities Served</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
                            <div className="text-gray-600">Client Retention Rate</div>
                        </div>
                    </div>
                </div>

                {/* Our B2B Services */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Comprehensive B2B Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <Award className="w-10 h-10 text-blue-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Employee Recognition</h3>
                            <p className="text-gray-600 text-sm">Celebrate achievements with premium gift sets that motivate and appreciate your team</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <Users className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Client Appreciation</h3>
                            <p className="text-gray-600 text-sm">Strengthen business relationships with thoughtfully curated corporate gift hampers</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Seasonal Campaigns</h3>
                            <p className="text-gray-600 text-sm">Festival and holiday gift packages designed for corporate distribution</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <Package className="w-10 h-10 text-orange-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Welcome Kits</h3>
                            <p className="text-gray-600 text-sm">Onboarding gift sets for new employees and business partners</p>
                        </div>
                    </div>
                </div>

                {/* Our Corporate Journey */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our B2B Evolution</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">1970s - Foundation of Trust</h3>
                                    <p className="text-gray-600">
                                        Started as a family business with focus on quality products. Built reputation 
                                        serving local businesses with reliable products and personalized service.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">1990s - Corporate Focus</h3>
                                    <p className="text-gray-600">
                                        Transitioned to B2B model, specializing in corporate bulk orders. Developed 
                                        customization capabilities and established relationships with major businesses.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Gift className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">2020s - Digital B2B Platform</h3>
                                    <p className="text-gray-600">
                                        Launched comprehensive online B2B platform with bulk ordering, account management, 
                                        and nationwide corporate delivery network.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner With Us for Corporate Gifting Success</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join 50+ businesses who trust TrazooProducts for their corporate gifting needs. 
                        Experience the perfect blend of tradition, quality, and modern B2B service.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.href = "/#products-section"}
                            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Browse Corporate Catalog
                            <Package className="ml-2 w-4 h-4" />
                        </button>
                        <button
                            onClick={() => window.location.href = "/#footer-section"}
                            className="inline-flex items-center justify-center px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
                        >
                            Get Business Account
                        </button>
                        <button
                            onClick={() => window.location.href = "/#bulk-quote"}
                            className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                            Request Quote
                        </button>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-4">Trusted by leading companies across India</p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Minimum Order: 25+ pieces
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                Volume Discounts Available
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                Pan-India Delivery
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}