import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import client from "../api/client";
import UploadImage from "../components/UploadImage";
const image = require("../../assets/images/bgw1.jpg");

const AddProductScreen = () => {
  const [id, setProductId] = useState("");
  const [name, setProductName] = useState("");
  const [stockCount, setStockCount] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = async () => {
    // Check if any of the fields are empty or undefined
    if (!id || !name || !description || !price || !stockCount) {
      console.error("Invalid product data. Please fill in all fields.");
      return;
    }

    // Create a productData object containing user input
    const productData = {
      id,
      name,
      stockCount,
      description,
      price,
    };

    try {
      console.log(productData);
      // Send a POST request to your server with valid productData
      const response = await client.post("/add-product", productData);

      // Handle the response as needed (e.g., show a success message)
      console.log("Product added successfully:", response.data);

      // Clear the input fields by resetting state variables
      setProductId("");
      setProductName("");
      setStockCount("");
      setDescription("");
      setPrice("");
      
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Error adding product:", error);
    }
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>

    <ScrollView>
      <View style={styles.ImageContainer}>
        <UploadImage />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Product ID:</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setProductId}
          placeholder="Enter Product ID"
        />

        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setProductName}
          placeholder="Enter Product Name"
        />

        <Text style={styles.label}>Stock Count:</Text>
        <TextInput
          style={styles.input}
          value={stockCount}
          onChangeText={setStockCount}
          placeholder="Enter Stock Count"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter Price"
        />

        <Button title="Add Product" onPress={handleAddProduct} />
      </View>
      
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 3,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 25,
    backgroundColor: "#eef",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  }
});

export default AddProductScreen;
