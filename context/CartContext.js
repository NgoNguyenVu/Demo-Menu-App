// CartContext.js
import React, { createContext, useState } from 'react';

// Create CartContext
export const CartContext = createContext();

// CartContext provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Initialize cart as an empty array

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if item already exists
      const existingItem = prevCart.find((cartItem) => cartItem.idCategory === item.idCategory);
      if (existingItem) {
        // If item exists, increase the quantity
        return prevCart.map((cartItem) =>
          cartItem.idCategory === item.idCategory
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (idCategory) => {
    setCart((prevCart) => prevCart.filter((item) => item.idCategory !== idCategory));
  };

  const increaseQuantity = (idCategory) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idCategory === idCategory ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (idCategory) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.idCategory === idCategory && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
