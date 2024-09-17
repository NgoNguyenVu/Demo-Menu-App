import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const DessertDetailsScreen = ({ route }) => {
  const { dessertId } = route.params;
  const [dessertDetails, setDessertDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'John Doe', text: 'Delicious and sweet, perfect for dessert lovers!', rating: 5 },
    { id: 2, user: 'Jane Smith', text: 'Too sweet for my taste, but still a nice treat.', rating: 3 },
  ]);

  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);

  const fetchDessertDetails = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dessertId}`);
      setDessertDetails(response.data.meals[0]);
      setLoading(false);
    } catch (error) {
      setError('Failed to load dessert details.');
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (dessertDetails) {
      addToCart({
        idMeal: dessertDetails.idMeal,
        strMeal: dessertDetails.strMeal,
        strMealThumb: dessertDetails.strMealThumb
      });
    }
  };

  const handleAddToFavorites = () => {
    if (dessertDetails) {
      addToFavorites({
        idMeal: dessertDetails.idMeal,
        strMeal: dessertDetails.strMeal,
        strMealThumb: dessertDetails.strMealThumb
      });
    }
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, user: 'User', text: comment, rating }]);
      setComment('');
      setRating(0);
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dessertDetails && (
        <>
          <Text style={styles.title}>{dessertDetails.strMeal}</Text>
          <Image source={{ uri: dessertDetails.strMealThumb }} style={styles.image} />
          <Text style={styles.instructions}>{dessertDetails.strInstructions}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
              <Icon name="shopping-cart" size={20} color="#fff" />
              <Text style={styles.buttonText}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.favoritesButton]} onPress={handleAddToFavorites}>
              <Icon name="heart" size={20} color="#fff" />
              <Text style={styles.buttonText}>Favorites</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingTitle}>Rate this Dessert</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.commentInput}
              multiline
              value={comment}
              onChangeText={setComment}
              placeholder="Write your comment here..."
            />
            <TouchableOpacity style={styles.submitCommentButton} onPress={handleSubmitComment}>
              <Text style={styles.buttonText}>Submit  </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Comments</Text>
            {comments.map((c) => (
              <View key={c.id} style={styles.commentItem}>
                <Text style={styles.commentUser}>{c.user}</Text>
                <Text style={styles.commentText}>{c.text}</Text>
                <Text style={styles.commentRating}>Rating: {c.rating} ★</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  image: {
    width: width * 0.85,
    height: width * 0.5,
    borderRadius: 20,
    marginVertical: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    justifyContent: 'center',
  },
  favoritesButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  ratingContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
    color: '#f39c12',
  },
  commentInput: {
    width: '100%',
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  submitCommentButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  commentsContainer: {
    width: '100%',
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2c3e50',
  },
  commentItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  commentText: {
    fontSize: 16,
    color: '#2c3e50',
    marginTop: 5,
  },
  commentRating: {
    fontSize: 14,
    color: '#3498db',
    marginTop: 5,
  },
});

export default DessertDetailsScreen;
