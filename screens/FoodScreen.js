import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Button,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const { width } = Dimensions.get('window'); // For responsive width

const FoodScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false); // State to manage search bar visibility
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories); // Assuming the response has a 'categories' field
        setLoading(false);
      } catch (error) {
        setError('Failed to load categories.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredCategories = categories.filter(category =>
    category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <View style={styles.screenContainer}>
      {/* Toggle Button */}
      <TouchableOpacity style={styles.searchButton} onPress={() => setSearchVisible(!searchVisible)}>
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Search Bar */}
      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search something..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      )}

      <FlatList
        data={filteredCategories}
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
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fdfdfd', // Match DrinkScreen background color
  },
  searchButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: '#3498db',
    borderRadius: 50,
    padding: 10,
  },
  searchInput: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: width * 0.9, // Responsive width
    alignSelf: 'center',
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
