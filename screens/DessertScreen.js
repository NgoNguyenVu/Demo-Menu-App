import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const { width } = Dimensions.get('window'); // For responsive width

const DessertScreen = ({ navigation }) => {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false); // State to manage search bar visibility
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredDesserts = desserts.filter(dessert =>
    dessert.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
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
        data={filteredDesserts}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
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
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fdfdfd', // Match FoodScreen and DrinkScreen background color
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
