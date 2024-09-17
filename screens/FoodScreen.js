import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchCategories } from '../api'; // Assuming the updated API utility

const FoodScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load categories.');
        setLoading(false);
      }
    };

    getCategories();
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
      data={categories}
      keyExtractor={(item) => item.idCategory}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => navigation.navigate('FoodDetailScreens', { categoryId: item.idCategory })}
        >
          <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryImage} />
          <Text style={styles.categoryName}>{item.strCategory}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fdfdfd', // Match DrinkScreen background color
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50', // Match DrinkScreen text color
    marginTop: 5,
    textAlign: 'center', // Center align text
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

export default FoodScreen;
