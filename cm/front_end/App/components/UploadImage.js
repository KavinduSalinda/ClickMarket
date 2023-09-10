import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import client from "../api/client";


export default function UploadImage() {
 
  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  const [image, setImage] = useState(null);
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(JSON.stringify(_image));
    const selectedAssets = _image.assets; // Array of selected assets

    if (selectedAssets.length > 0) {
      // At least one asset is selected, you can access the first asset's URI
      const assetsArray = selectedAssets[0];
      const imageUri = assetsArray.uri;
      console.log("Asset URI============:", imageUri);
      setImage(imageUri);
      console.log(
        '"-------------------------------------------------------------------------------------------------"'
      );
      // Construct the FormData object
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "file_name",
      });

      try {
        // Send the image data to the server's /Product-Image endpoint using FormData
        console.log(formData)
        const response = await client.post("/Product-Image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle the server's response as needed
        console.log("Server response:", response.data);
      } catch (error) {
        // Handle any errors from the API call
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("No assets selected");
    }
    
  };
  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 400, height: 300 }} />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 300,
    width: 400,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 2,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
