import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import ProductList from "../components/ProductList";
import axios from 'axios';///////////////////
import client from "../api/client";
import HeaderDropdownButton from "../components/HeaderDropdownButton";

const DashboardScreen = ({ navigation }) => {
  
  // const goToCart =()=>{
  //   navigation.navigate("cart");
  // }
  // // Customize the header bar
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: 'Home', // Set the title of the header bar
  //     headerRight: () => (
  //       <CartButton onPress={goToCart} title="Cart"/>
  //     )
  //   });
  // }, [navigation]);

  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch all data from the API
    // axios.get('http://192.168.8.183:8000/api/products')
    client.get("/api/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <SafeAreaView  style={styles.container}>
      <ProductList products={products} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default DashboardScreen;
