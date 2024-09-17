import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { CartContext } from '../context/CartContext';  // Import CartContext
import { FavoritesContext } from '../context/FavoritesContext';  // Import FavoritesContext
import { fetchCategories } from '../api';  // Import API fetchCategories
import Icon from 'react-native-vector-icons/FontAwesome';  // Import icons

const { width } = Dimensions.get('window');

const FoodDetailScreens = ({ route }) => {
  const { categoryId } = route.params;
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);  // Sử dụng CartContext
  const { addToFavorites } = useContext(FavoritesContext);  // Sử dụng FavoritesContext
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'John Doe', text: 'Great dish! Loved it!', rating: 5 },
    { id: 2, user: 'Jane Smith', text: 'Not bad, but could use more seasoning.', rating: 3 }
  ]); // Sample comments

  // Fetch category details
  const fetchCategoryDetails = async (categoryId) => {
    try {
      const categories = await fetchCategories();
      const category = categories.find((cat) => cat.idCategory === categoryId);
      setCategoryDetails(category);
      setLoading(false);
    } catch (err) {
      setError('Failed to load category details.');
      setLoading(false);
    }
  };

  // Thêm món ăn vào giỏ hàng
  const handleAddToCart = () => {
    addToCart(categoryDetails);
  };

  // Thêm món ăn vào danh sách yêu thích
  const handleAddToFavorites = () => {
    addToFavorites(categoryDetails);  // Sử dụng context để thêm vào yêu thích
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, user: 'User', text: comment, rating }]);
      setComment('');
      setRating(0);
    }
  };

  useEffect(() => {
    fetchCategoryDetails(categoryId);  // Fetch category details khi mount component
  }, [categoryId]);

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
      {categoryDetails && (
        <>
          <Text style={styles.title}>{categoryDetails.strCategory}</Text>
          <Image
            source={{ uri: categoryDetails.strCategoryThumb }}
            style={styles.image}
          />
          <Text style={styles.description}>
            {categoryDetails.strCategoryDescription}
          </Text>

          {/* Nút Order và Add to Favorites */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddToCart}
            >
              <Icon name="shopping-cart" size={20} color="#fff" />
              <Text style={styles.buttonText}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.favoritesButton]}
              onPress={handleAddToFavorites}
            >
              <Icon name="heart" size={20} color="#fff" />
              <Text style={styles.buttonText}>Favorites</Text>
            </TouchableOpacity>
          </View>

          {/* Rating and Comment Section */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingTitle}>Rate this Dish</Text>
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
            <TouchableOpacity
              style={styles.submitCommentButton}
              onPress={handleSubmitComment}
            >
              <Text style={styles.buttonText}>Submit  </Text>
            </TouchableOpacity>
          </View>

          {/* Display Comments */}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
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
  filledStar: {
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
    backgroundColor: '#fff',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  submitCommentButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
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
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
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




export default FoodDetailScreens;
  