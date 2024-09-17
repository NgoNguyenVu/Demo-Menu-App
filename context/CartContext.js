import React, { createContext, useState } from 'react';

// Create CartContext
export const CartContext = createContext();

// CartContext provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Initialize cart as an empty array

  // Function to add item to cart with quantity management
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.idCategory === item.idCategory);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.idCategory === item.idCategory
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from cart
  const removeFromCart = (idCategory) => {
    setCart((prevCart) => prevCart.filter((item) => item.idCategory !== idCategory));
  };

  // Function to increase quantity of an item
  const increaseQuantity = (idCategory) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idCategory === idCategory ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity of an item
  const decreaseQuantity = (idCategory) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idCategory === idCategory && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
