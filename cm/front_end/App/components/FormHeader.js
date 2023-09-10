import { View, Text, StyleSheet, Animated } from "react-native";
import React from "react";

export default function FormHeader({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX =0,
  rightHeaderTranslateY =-20,
  rightHeaderOpacity =0,
}) {
  return (
    <View>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
            { transform: [{ translateX: leftHeaderTranslateX }] },
          ]}
        >
          {leftHeading}
        </Animated.Text>
        
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: rightHeaderOpacity,
              transform: [{ translateY: rightHeaderTranslateY }],
            },
          ]}
        >
          {rightHeading}
        </Animated.Text>
      </View>
      <Text style={styles.subContainer}>{subHeading}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#268",
  },
  subContainer: { fontSize: 20, color: "#1b1b33", textAlign: "center" },
});
