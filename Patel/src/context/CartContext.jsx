import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('b2b_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('b2b_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + (product.minOrder || 1) }
            : item
        );
      }
      
      return [...prevCart, {
        _id: product._id,
        name: product.name,
        price: product.price,
        bulkPrice: product.bulkPrice || product.price * 0.7,
        image: product.image,
        category: product.category,
        description: product.description,
        quantity: product.minOrder || 1,
        minOrder: product.minOrder || 1
      }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item._id === productId) {
          const minQty = item.minOrder || 1;
          return { 
            ...item, 
            quantity: Math.max(minQty, newQuantity) 
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('b2b_cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.bulkPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const calculateDiscount = (subtotal) => {
    if (subtotal >= 10000) return Math.round(subtotal * 0.15);
    if (subtotal >= 5000) return Math.round(subtotal * 0.10);
    return Math.round(subtotal * 0.05);
  };

  const calculateGST = (amount) => {
    return Math.round(amount * 0.18);
  };

  const getOrderSummary = () => {
    const subtotal = getCartTotal();
    const discount = calculateDiscount(subtotal);
    const discountedAmount = subtotal - discount;
    const gst = calculateGST(discountedAmount);
    const total = discountedAmount + gst;

    return {
      subtotal,
      discount,
      discountedAmount,
      gst,
      total,
      items: cart
    };
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    getOrderSummary,
    calculateDiscount,
    calculateGST
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};