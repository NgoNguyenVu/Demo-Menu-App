import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Function to fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    return response.data.categories; // Accessing the 'categories' field in the response
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    console.error('Error details:', error.response ? error.response.data : error);
    throw error;
  }
};
