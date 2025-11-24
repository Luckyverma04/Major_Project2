import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { 
  Search, Filter, Grid, List, Star, ArrowRight, Package, Award, 
  Truck, Shield, ShoppingCart, Eye 
} from "lucide-react";

const Products = () => {
  const { addToCart } = useCart(); // ✅ FIX: Now we use global CartContext

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://patelcropproducts.onrender.com/api/v1/products");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Categories
  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "clothing", name: "T-Shirts & Shirts", count: products.filter(p => p.category === "clothing").length },
    { id: "bags", name: "Bags & Backpacks", count: products.filter(p => p.category === "bags").length },
    { id: "accessories", name: "Accessories", count: products.filter(p => p.category === "accessories").length },
    { id: "stationery", name: "Stationery", count: products.filter(p => p.category === "stationery").length },
    { id: "electronics", name: "Electronics", count: products.filter(p => p.category === "electronics").length }
  ];

  // Filtering + Search + Sort
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.features && product.features.some(feature =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, products]);

  // Product Card
  const ProductCard = ({ product }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden">
      <div className="absolute top-4 right-4 space-y-2">
        {product.bestseller && (
          <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            Bestseller
          </div>
        )}
        {product.bulkPrice && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{Math.round(((product.price - product.bulkPrice) / product.price) * 100)}% Bulk
          </div>
        )}
      </div>

      {/* Product Image */}
      <div className="text-center mb-6">
        <div className="w-full h-48 flex items-center justify-center">
          {product.image?.url ? (
            <img
              src={product.image.url}
              alt={product.name}
              className="h-40 object-contain"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-4xl">
              {product.emoji || "📦"}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
      </div>

      {/* Pricing */}
      <div className="border-t border-white/20 pt-4 mb-6 text-center">
        <div className="text-white font-semibold">₹{product.price}</div>
        {product.bulkPrice && (
          <div className="text-green-400 font-bold">Bulk: ₹{product.bulkPrice}</div>
        )}
        {product.minOrder && (
          <div className="text-blue-200 text-sm">Min Order: {product.minOrder}</div>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700"
      >
        <ShoppingCart className="w-4 h-4 inline mr-2" />
        Add to Cart
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl text-white font-bold mb-6">Trazoo Products Catalog</h1>

        {/* Search + Filter */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
          >
            {categories.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-800">
                {c.name} ({c.count})
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-white mt-10">No products found</div>
        )}
      </div>
    </div>
  );
};

export default Products;
