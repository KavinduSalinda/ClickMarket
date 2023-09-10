import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CartButton = ({ onPress, title, disabled,color }) => {
  
  return (
    <TouchableOpacity
    style={[styles.button, disabled && styles.disabled, { backgroundColor: color }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CartButton;
