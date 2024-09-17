import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DessertDetailsScreen = ({ route }) => {
  const { dessertId } = route.params;
  const [dessertDetails, setDessertDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDessertDetails = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dessertId}`);
      setDessertDetails(response.data.meals[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDessertDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!dessertDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load dessert details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dessertDetails.strMeal}</Text>
      <Image source={{ uri: dessertDetails.strMealThumb }} style={styles.image} />
      <Text style={styles.category}>Category: {dessertDetails.strCategory}</Text>
      <Text style={styles.instructions}>{dessertDetails.strInstructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  category: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 22,
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

export default DessertDetailsScreen;
