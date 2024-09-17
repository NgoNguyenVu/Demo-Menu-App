// FavoritesContext.js
import React, { createContext, useState } from 'react';

// Tạo context cho Favorites
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Hàm để thêm món ăn, đồ uống, hoặc tráng miệng vào danh sách yêu thích
  const addToFavorites = (item) => {
    // Tạo một identifier chung để so sánh
    const itemId = item.idCategory || item.idDrink || item.idMeal;
    const itemType = item.idCategory ? 'food' : item.idDrink ? 'drink' : 'dessert';

    // Kiểm tra xem item đã có trong danh sách yêu thích chưa
    const existingItem = favorites.find(fav => fav.id === itemId && fav.type === itemType);

    if (!existingItem) {
      setFavorites([...favorites, { ...item, id: itemId, type: itemType }]);
    } else {
      alert(`${item.strCategory || item.strDrink || item.strMeal} đã có trong danh sách yêu thích!`);
    }
  };

  // Hàm để xóa món ăn, đồ uống, hoặc tráng miệng khỏi danh sách yêu thích
  const removeFromFavorites = (item) => {
    setFavorites(favorites.filter(fav => !(fav.id === item.id && fav.type === item.type)));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
