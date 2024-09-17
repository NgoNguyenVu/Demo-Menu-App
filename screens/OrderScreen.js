// OrderScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { CartContext } from '../context/CartContext';

const OrderScreen = ({ navigation }) => {
  const { cart, placeOrder } = useContext(CartContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleOrderConfirmation = () => {
    if (name.trim() && phone.trim() && address.trim()) {
      placeOrder({ name, phone, address });
      navigation.navigate('OrderSuccess'); // Navigate after placing order
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Place Your Order</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <Text style={styles.totalText}>Total Items: {totalQuantity}</Text>
          </View>
        }
        data={cart}
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
        ListFooterComponent={
          <TouchableOpacity
            onPress={handleOrderConfirmation}
            style={styles.orderButton}
          >
            <Text style={styles.buttonText}>Confirm Order</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingBottom: 20 }} // Padding for footer
      />
    </KeyboardAvoidingView>
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
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  orderButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default OrderScreen;
