import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CartButton from "./CartButton";
import client from "../api/client";

const ProductCard = ({ product }) => {
  function getProduct() {
    // console.log(product);
    return (product);
  }
  
  const navigation = useNavigation();
  const handleAddCart = () => {
    // Navigate to the 'SingleItemPage' screen, passing the 'product' object as a parameter
    navigation.navigate("SingleItemPage", { product });
    console.log(product);
    
    // navigation.navigate(SingleItemPage);// navigator
  };

  const stockdoun = async () => {
    const product =getProduct()

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
    const product =getProduct()
console.log(product)
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

  const addCart = () => { 
    const product =getProduct()
    navigation.navigate("cart", { product });
  };

  return (
    <TouchableOpacity onPress={handleAddCart} style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <View style={{ flexDirection: "row"}}>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <View style={styles.fixToText}>
          <CartButton onPress={buyItem} title="Buy" color="#3399ff" />
          <CartButton onPress={addCart} title="Add to Cart" color="orange" />
        </View>
      </View>
      {/* Add more product details as needed */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    paddingTop: "5%",
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#900",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 1,
  },
  image: {
    width: "100%", // change as desire
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    backgroundColor: "#cfe0ff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    paddingLeft: 20,
  },
  price: {
    flex:2,
    fontSize: 16,
    marginTop: 4,
    paddingLeft: 20
  },
  fixToText: {
    flex:3,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
});

export default ProductCard;
