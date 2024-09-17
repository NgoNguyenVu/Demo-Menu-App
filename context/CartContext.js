// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if the item already exists (handles food, drinks, and desserts)
      const existingItem = prevCart.find((cartItem) =>
        item.idCategory ? cartItem.idCategory === item.idCategory :
        item.idDrink ? cartItem.idDrink === item.idDrink :
        cartItem.idMeal === item.idMeal
      );
      if (existingItem) {
        // If item exists, increase the quantity
        return prevCart.map((cartItem) =>
          (item.idCategory && cartItem.idCategory === item.idCategory) ||
          (item.idDrink && cartItem.idDrink === item.idDrink) ||
          (item.idMeal && cartItem.idMeal === item.idMeal)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) =>
      item.idCategory ? item.idCategory !== id :
      item.idDrink ? item.idDrink !== id :
      item.idMeal !== id
    ));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.idCategory && item.idCategory === id) ||
        (item.idDrink && item.idDrink === id) ||
        (item.idMeal && item.idMeal === id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          (item.idCategory && item.idCategory === id) ||
          (item.idDrink && item.idDrink === id) ||
          (item.idMeal && item.idMeal === id)
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
