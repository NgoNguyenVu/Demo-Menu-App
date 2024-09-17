import React, { createContext, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const { favorites, removeFromFavorites, addToFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    addToCart(item);
    navigation.navigate('Order'); // Navigate to Order screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No items in favorites.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* Display item image */}
              <Image source={{ uri: item.strCategoryThumb }} style={styles.itemImage} />

              {/* Display item name */}
              <View style={styles.detailsContainer}>
                <Text style={styles.itemText}>{item.strCategory}</Text>
              </View>

              {/* Add to cart button */}
              <TouchableOpacity
                onPress={() => handleAddToCart(item)}
                style={styles.addButton}
              >
                <Text style={styles.buttonText}>Order</Text>
              </TouchableOpacity>

              {/* Remove button */}
              <TouchableOpacity
                onPress={() => removeFromFavorites(item)}
                style={styles.removeButton}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FavoritesScreen;
