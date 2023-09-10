import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const FormSubmitButton = ({ title,submitting, onPress }) => {
  const backgroundColor = submitting
    ? "rgba(27,27,51,0.5)"
    : "rgba(27,27,51,1)";
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.btn}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 18,
    color: "#fff",
  },
});
