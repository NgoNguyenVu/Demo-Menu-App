import React, { createContext, useState } from 'react';

// Tạo context cho Favorites
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Hàm để thêm món ăn vào danh sách yêu thích
  const addToFavorites = (item) => {
    // Kiểm tra xem item đã có trong danh sách yêu thích chưa
    if (!favorites.find(fav => fav.idCategory === item.idCategory)) {
      setFavorites([...favorites, item]);
    } else {
      alert(`${item.strCategory} đã có trong danh sách yêu thích!`);
    }
  };

  // Hàm để xóa món ăn khỏi danh sách yêu thích
  const removeFromFavorites = (item) => {
    setFavorites(favorites.filter(fav => fav.idCategory !== item.idCategory));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
