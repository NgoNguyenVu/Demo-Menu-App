// OrderCompleteScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { CartContext } from '../context/CartContext';

const OrderCompleteScreen = () => {
  const { orderDetails } = useContext(CartContext);

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Orders Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Complete</Text>
      <FlatList
        data={orderDetails.cartItems}
        keyExtractor={(item) => item.idCategory || item.idDrink || item.idMeal} // Use unique ID
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.strCategoryThumb || item.strDrinkThumb || item.strMealThumb }} // Handle all types
              style={styles.itemImage}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.itemText}>{item.strCategory || item.strDrink || item.strMeal}</Text>
              <Text style={styles.quantityText}>Quantity: {item.quantity || 1}</Text>
            </View>
          </View>
        )}
      />
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,  // Add margin to left and right
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
  quantityText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default OrderCompleteScreen;
