import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OrderSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Successful!</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Food')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
});

export default OrderSuccessScreen;
