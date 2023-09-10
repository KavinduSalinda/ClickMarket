import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppForm from "./AppForm";
import DashboardScreen from "./App/pages/DashboardScreen";
import SingleItemPage from "./App/pages/SingleItemPage";
import Cart1 from "./App/pages/Cart1";
import UserSelection from "./App/pages/UserSelection";
import AddProductScreen from "./App/pages/AddProductScreen";
import { Text, View } from "react-native";
import HeaderDropdown from "./App/components/HeaderDropdownButton";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserSelection">
        <Stack.Screen
          name="UserSelection"
          component={UserSelection}
          options={{ headerShown: false }} 
        />
          <Stack.Screen name="AppForm" component={AppForm} options={{ headerShown: false }} />
          <Stack.Screen
            options={{
              title: "ClickMarket",
              headerStyle: {
                backgroundColor: "#6451a1",
              },
              headerTintColor: "#fff",
              headerTitleAlign:'center',
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }}
            name="DashboardScreen"
            component={DashboardScreen}
          />
        <Stack.Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={{
            title: " Add your product",
            headerTitleAlign:'center',
            
            headerStyle: { backgroundColor: "#679"},
            headerTintColor: "#2ee",
            headerTitleStyle: {
              fontWeight: "bold",
            },headerLeft: () => (
              <View style={{paddingLeft:20,paddingTop:12}}><Text><HeaderDropdown/> </Text></View>
            )
          }}
        />
        <Stack.Screen
          options={{
            title: "Products",
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: "#6451a1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          name="SingleItemPage"
          component={SingleItemPage}
        />
        <Stack.Screen
          options={{
            title: "Cart",
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: "#6451a1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          name="cart"
          component={Cart1}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
//npx react-native run-android --variant=release
