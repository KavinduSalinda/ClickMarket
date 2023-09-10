import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart1 = ({ route, navigation }) => {
  const { product } = route.params;

  useEffect(() => {
    // Load existing cart data from AsyncStorage
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      // Retrieve the existing cart data from AsyncStorage
      const existingCartDataJSON = await AsyncStorage.getItem('cartProducts');

      if (existingCartDataJSON) {
        // Parse the existing cart data from JSON
        const existingCartData = JSON.parse(existingCartDataJSON);

        // Add the current product to the cart data
        existingCartData.push(product);

        // Convert the updated cart data back to JSON
        const updatedCartDataJSON = JSON.stringify(existingCartData);

        // Store the updated cart data in AsyncStorage
        await AsyncStorage.setItem('cartProducts', updatedCartDataJSON);

        console.log('Product added to the cart:', product);
      } else {
        // If no existing cart data, create a new array with the current product and store it
        const cartData = [product];

        // Convert the cart data to JSON and store it in AsyncStorage
        const cartDataJSON = JSON.stringify(cartData);
        await AsyncStorage.setItem('cartProducts', cartDataJSON);

        console.log('Cart created with the product:', product);
      }
    } catch (error) {
      console.error('Error storing product in cart:', error);
    }
  };

  const handleRemove = async () => {
    try {
      // You can implement logic here to remove the product from the cart array
      // Load the cart data from AsyncStorage, remove the product, and update AsyncStorage

      console.log('Product removed from the cart');
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price: {product.price}</Text>
      <Button title="Remove from Cart" onPress={handleRemove} />
    </View>
  );
};

export default Cart1;


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#b1f1ff",
    borderRadius: 5,
    margin: 5,
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#770",
  },
  fixToText: {
    justifyContent: "space-between",
    paddingLeft: 100,
    borderRadius: 8,
    color: "#fd6f00",
  },
});
