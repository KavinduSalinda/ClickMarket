import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import FormHeader from "./App/components/FormHeader";
import FormSelectorButton from "./App/components/FormSelectorButton";
import LoginForm from "./App/components/LoginForm";
import SignupForm from "./App/components/SignupForm";
import { useEffect, useRef } from "react";
import client from "./App/api/client";
import { useRoute } from "@react-navigation/native";
const image = require("./assets/images/bgw3.jpg");

const { width } = Dimensions.get("window");

export default function AppForm() {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const route = useRoute();

  const fetchApi = async () => {
    try {
      // const res = await axios.get('http://192.168.8.183:8000/')
      const res = await client.get("/");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInterpolation = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,1)", "rgba(27,27,51,0.4)"],
  });
  const signupColorInterpolation = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,0.4)", "rgba(27,27,51,1)"],
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{ flex: 1, paddingTop: 90 }}>
          <View style={{ height: 100 }}>
            <FormHeader
              leftHeading="Welcome "
              rightHeading="Back"
              subHeading="__________"
              rightHeaderOpacity={rightHeaderOpacity}
              leftHeaderTranslateX={leftHeaderTranslateX}
              rightHeaderTranslateY={rightHeaderTranslateY}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <FormSelectorButton
              style={styles.boarderLeft}
              backgroundColor={loginColorInterpolation}
              title="Login"
              onPress={() => scrollView.current.scrollTo({ x: 0 })}
            />
            <FormSelectorButton
              style={styles.boarderRight}
              backgroundColor={signupColorInterpolation}
              title="Sign up"
              onPress={() => scrollView.current.scrollTo({ x: width })}
            />
          </View>

          <ScrollView
            ref={scrollView}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            // onScroll={({nativeEvent})=> console.log(nativeEvent.contentOffset)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: animation } } }],
              { useNativeDriver: false }
            )}
          >
            <LoginForm />
            <ScrollView>
              <SignupForm />
            </ScrollView>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  boarderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  boarderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  container0: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

//npm install @react-navigation/native @react-navigation/stack
// npm install react-native-paper
// formik use to validate and yup
