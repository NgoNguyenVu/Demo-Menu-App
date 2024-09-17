import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import FoodScreen from './screens/FoodScreen';
import DrinkScreen from './screens/DrinkScreen';
import DessertScreen from './screens/DessertScreen';
import FoodDetailScreens from './screens/FoodDetailScreens';
import DessertDetailsScreen from './screens/DessertDetailsScreen';
import DrinkDetailsScreen from './screens/DrinkDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { CartProvider } from './context/CartContext'; // Cart context
import { FavoritesProvider } from './context/FavoritesContext'; // Favorites context
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';  // Import OrderScreen
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Food') {
          iconName = 'restaurant';
        } else if (route.name === 'Drink') {
          iconName = 'local-bar';
        } else if (route.name === 'Dessert') {
          iconName = 'cake';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Food" component={FoodScreen} options={{ title: 'Food' }} />
    <Tab.Screen name="Drink" component={DrinkScreen} options={{ title: 'Drink' }} />
    <Tab.Screen name="Dessert" component={DessertScreen} options={{ title: 'Dessert' }} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Categories" component={TabNavigator} />
    <Drawer.Screen name="Cart" component={CartScreen} />
    <Drawer.Screen name="Favorites" component={FavoritesScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DrawerNavigator">
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="FoodDetailScreens" component={FoodDetailScreens} options={{ title: 'Food Details' }} />
            <Stack.Screen name="DrinkDetails" component={DrinkDetailsScreen} options={{ title: 'Drink Details' }} />
            <Stack.Screen name="DessertDetails" component={DessertDetailsScreen} options={{ title: 'Dessert Details' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
            <Stack.Screen name="Order" component={OrderScreen} options={{ title: 'Place Order' }} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ title: 'Order Success' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
