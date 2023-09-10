import { Text } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { isValidEmail,updateError,isValidObject } from "../utils/methoda";
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password} = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

const isValidForm = () => {
  // we will accept only if all of the fields have value
  if (!isValidObject(userInfo))
    return updateError("Required all fields!", setError);
  // only valid email id is allowed
  if (!isValidEmail(email)) return updateError("Invalid email!", setError);
  // password must have 8 or more characters
  if (!password.trim() || password.length < 8)
    return updateError("Password is less then 8 characters!", setError);
  // password and confirm password must be the same

  return true;
};

// const submitForm = async () => {
//   try {
//     const isValid = isValidForm(); // Invoke isValidForm function to get the result
//     if (isValid) {
//       // submit form
//       console.log(userInfo);
//       const res =await client.post('/sign-in',{...userInfo}) //spred user info
//       console.log(res.data)
//     }
//   } catch (error) {
//     console.log(error.message)
//   }
// };



const submitForm = async () => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(userType);
  
  if (isValidForm()) {
    try {
      const res = await client.post('/sign-in', { ...userInfo });

      if (res.data.success) {
        setUserInfo({ email: '', password: '' });
        // setIsLoggedIn(true);
      }
      console.log(res.data);
      headers: {
        'Content-Type', 'application/json',
        authorization= 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNhNmJjOWZhMjhlMjljMDU3MDA1YzciLCJpYXQiOjE2OTEwMDE4MjEsImV4cCI6MTY5MTA4ODIyMX0.kxuM_GaBRIYq-cJH2fk5_sAgIMK6w9DzudK5ONfcJpw'

        // Add any other default headers here if needed
      }
  // Extract the token from the response data
  const token = res.data.token;
  await AsyncStorage.setItem('authToken', token);//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Set the authorization token in the client headers for subsequent requests
  client.defaults.headers.common['Authorization'] = `JWT ${token}`;
      
  
  // Navigate to the Dashboard screen
  if (userType == '0') {
      navigation.navigate("DashboardScreen");
    } else if (userType == '1') {
        navigation.navigate("AddProductScreen");
    }
      
      // navigation.navigate(DashboardScreen);
    } catch (error) {
      console.log(error);
    }
  }
};

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 14, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "email")}
        label="Email"
        placeholder="example@email.com"
      />
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "password")}
        label="Password"
        placeholder="********"
      />
      <FormSubmitButton onPress={submitForm} title="Login" />
    </FormContainer>
  );
};

export default LoginForm;

//=====================================================
let userType = "";
export const sendValueToAnotherFile = (value) => {
  userType = value;

  return userType;
};

//===================================