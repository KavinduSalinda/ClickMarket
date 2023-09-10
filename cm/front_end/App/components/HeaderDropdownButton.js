import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const HeaderDropdown = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const handleDropdownPress = () => {
    setIsVisible(!isVisible);
  };

  const handleMenuItemPress = (item) => {
    // Handle menu item press here
    console.log(`Selected: ${item}`);
    setIsVisible(false);
    if (item=="DashBoard") {
      navigation.navigate("DashboardScreen")
    }
  };

  const menuItems = ["Refresh", "DashBoard"];

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleDropdownPress}>
        <Ionicons style={styles.dropdownButton} name="menu" size={40} color="white" />
        </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.menu}>menu</Text>
          <FlatList
            data={menuItems}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius:8,
  },
  dropdownButton: {
    fontSize: 32,
    fontWeight: "bold",
    borderRadius: 6,
  },
  modal: {
    // justifyContent: "flex-end",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    margin:5,
    paddingRight:30,
    borderRadius:4,
    borderStartColor:'darkblue',
    borderStartWidth:10
  },
  menuItem: {
    width:150,
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menu:{
    fontSize:24,
    fontWeight:"bold",
    width:150,
    backgroundColor: "#9abcde",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  }
});

export default HeaderDropdown;
