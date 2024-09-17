import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const DessertScreen = ({ navigation }) => {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the list of desserts
  const fetchDesserts = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
      setDesserts(response.data.meals);
      setLoading(false);
    } catch (err) {
      setError('Failed to load desserts.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesserts(); // Fetch desserts when the component is mounted
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
      data={desserts}
      numColumns={2}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.dessertItem}
          onPress={() => navigation.navigate('DessertDetails', { dessertId: item.idMeal })}
        >
          <Image source={{ uri: item.strMealThumb }} style={styles.dessertImage} />
          <Text style={styles.dessertName}>{item.strMeal}</Text>
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
  dessertItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  dessertImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  dessertName: {
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

export default DessertScreen;
