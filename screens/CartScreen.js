import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigation = useNavigation();

  // Calculate total quantity of items in the cart
  const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add items to the cart before placing an order.');
    } else {
      navigation.navigate('Order'); // Navigate to Order screen
    }
  };

  const renderCartItem = ({ item }) => {
    // Check if item is a drink, dessert, or category and display accordingly
    const isDrink = item.idDrink;
    const isDessert = item.idMeal;
    const isCategory = item.idCategory;

    return (
      <View style={styles.itemContainer}>
        {/* Display item image */}
        <Image
          source={{ uri: isDrink ? item.strDrinkThumb : isDessert ? item.strMealThumb : item.strCategoryThumb }}
          style={styles.itemImage}
        />
        
        {/* Display item name and quantity */}
        <View style={styles.detailsContainer}>
          <Text style={styles.itemText}>{isDrink ? item.strDrink : isDessert ? item.strMeal : item.strCategory}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decreaseQuantity(isDrink ? item.idDrink : isDessert ? item.idMeal : item.idCategory)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity || 1}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(isDrink ? item.idDrink : isDessert ? item.idMeal : item.idCategory)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Remove button */}
        <TouchableOpacity
          onPress={() => removeFromCart(isDrink ? item.idDrink : isDessert ? item.idMeal : item.idCategory)}
          style={styles.removeButton}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.idDrink || item.idMeal || item.idCategory}
          renderItem={renderCartItem}
        />
      )}
      {/* Display total quantity */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Items: {totalQuantity}</Text>
      </View>
      {/* Place Order button */}
      <TouchableOpacity
        onPress={handlePlaceOrder}
        style={styles.orderButton}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdfdfd',
    justifyContent: 'space-between', // Push the Place Order button to the bottom
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 20,
    padding: 5,
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  totalContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CartScreen;
