import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const DrinkScreen = ({ navigation }) => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the list of alcoholic drinks
  const fetchDrinks = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
      setDrinks(response.data.drinks);
      setLoading(false);
    } catch (err) {
      setError('Failed to load drinks.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinks(); // Fetch drinks when the component is mounted
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={drinks}
      numColumns={2}
      keyExtractor={(item) => item.idDrink}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.drinkItem}
          onPress={() => navigation.navigate('DrinkDetails', { drinkId: item.idDrink })}
        >
          <Image source={{ uri: item.strDrinkThumb }} style={styles.drinkImage} />
          <Text style={styles.drinkName}>{item.strDrink}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fdfdfd',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drinkItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  drinkImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  drinkName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 5,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DrinkScreen;
