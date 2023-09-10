import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CartButton from "../components/CartButton";

import { Dimensions } from "react-native";
import client from "../api/client";
const screenWidth = Dimensions.get("window").width;

const SingleItemPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    navigation.navigate("SingleItemPage", { product });
    setIsRefreshing(false);
  };

  const route = useRoute();
  const { product } = route.params;
  const navigation = useNavigation();

  const stockdoun = async () => {
    Alert.alert("Congratulations!!!", "Item will be delivered within two days");
    product.stockCount = product.stockCount - 1;
    const newstock = product.stockCount;
    const id = product.id;
    const formData = new FormData();

    formData.append("stockCount", newstock.toString());
    formData.append("id", id.toString());

    try {
      const response = await client.post("/update-stock", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const buyItem = () => {
    if (product.stockCount == 0) {
      Alert.alert("Sorry!", "There are no items in stores");
    } else {
      Alert.alert("", "Do you want to buy this item?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: stockdoun },
      ]);
    }
  };

  const addCart = async () => {
    console.log("added to cart");
    navigation.navigate("cart", { product });
    // setCart([...cart, product]);
  };
  let stockstatus;
  let color;
  if (product.stockCount == 0) {
    stockstatus = "Out of stock";
    color = "#c22";
  } else {
    stockstatus = product.stockCount + " - in stock";
    color = "#22b";
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}

          // You can customize the appearance of the refresh control here
          // For example, you can set colors, tintColor, title, etc.
        />
      }
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={[styles.stock, { color: color }]}>{stockstatus}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>Price: ${product.price}</Text>
        
        <View style={styles.btncontainer}>
          <CartButton onPress={addCart} title="Add to Cart" color="orange" />
        </View> 
        <View style={styles.btncontainer}>
          <CartButton onPress={buyItem} title="Buy" color="#3399ff" />
        </View></View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: "cover",
    borderRadius: 10,
    backgroundColor: "#cdc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  priceRow: { flexDirection: "column", paddingTop: 10 },
  stock: {
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 10,
  },
  price: {
    fontSize: 32,
    color: "#770",
    marginBottom: 4,

  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  btncontainer: {
    paddingVertical:4,
    padding: 0
  },
});

export default SingleItemPage;
