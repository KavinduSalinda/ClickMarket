import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserSelectionbtn from "../components/UserSelectionbtn";
import { sendValueToAnotherFile } from "../components/LoginForm";

const image = require("../../assets/images/bgw1.jpg");

const UserSelection = () => {
  // const route = useRoute();
  const navigation = useNavigation();
  const userbtn = () => {
    navigation.navigate("AppForm");
    let userType = 0;

    // Call the function to send the value to another file
    sendValueToAnotherFile(userType);
  };

  const adminbtn = () => {
    navigation.navigate("AppForm");
    // Get the value you want to send
    let userType = 1;

    // Call the function to send the value to another file
    sendValueToAnotherFile(userType);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container1}>
          <View style={{paddingBottom:70}}>
            <Text style={styles.text}>ClickMarket</Text>
          </View>
          <UserSelectionbtn onPress={userbtn} title="User" />
          <UserSelectionbtn onPress={adminbtn} title="Admin" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default UserSelection;

const styles = StyleSheet.create({
  container1: {
    verticalAlign: "middle",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    margin: 20,
    borderRadius: 20,
    paddingBottom: 20,
    color: '#ff0',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
