import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const UserSelectionbtn = ({ onPress, title,disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal:40,
    marginVertical:12,
    backgroundColor:'rgba(182,178,191, 0.5)',
    paddingVertical: 14,
    paddingHorizontal:10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.7,
  },
});

export default UserSelectionbtn;
