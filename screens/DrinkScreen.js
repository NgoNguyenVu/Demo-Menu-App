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

const DrinkScreen = ({ navigation }) => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false); // State to manage search bar visibility
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the list of drinks
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

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredDrinks = drinks.filter(drink =>
    drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
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
        data={filteredDrinks}
        keyExtractor={(item) => item.idDrink}
        numColumns={2}
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
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fdfdfd', // Match FoodScreen background color
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
