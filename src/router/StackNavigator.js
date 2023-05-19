import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { Provider } from "react-redux";
import store from "../store";

import { StripeProvider } from "@stripe/stripe-react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import BookedScreen from "../components/BookedScreen1";
import ConfirmScreen1 from "../components/ConfirmScreen1";
import DetailsScreen2 from "../components/DetailsScreen2";
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";
import SearchScreen from "../components/SearchScreen";
import SeatSelectScreen from "../components/SeatSelectScreen";
import ProfileScreen from "../components/ProfileScreen";
import BookingDetailsScreen from "../components/BookingDetailScreen";

import SeatScreen from "../components/SeatScreen"

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Search"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "#1f1cc4",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
          component={SearchScreen}
        />
        <Tab.Screen
          name="Booked"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "#1f1cc4",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color} />
            ),
          }}
          component={BookedScreen}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "#1f1cc4",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person" size={size} color={color} />
            ),
          }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StripeProvider publishableKey="pk_test_51N060eAtNgtPyk47I8mfm21l1NTPQ7N9eFS4x2Hx2syhpDfzrsoxCaxeGiQakYZhpi2NXWJRImZy9Y9TMHbM70FR00h4TINxl7">
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="Signup"
              options={{ headerShown: false }}
              component={RegisterScreen}
            />

            <Stack.Screen
              name="Search2"
              component={BottomTabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Details"
              // options={{ headerShown: false }}
              component={DetailsScreen2}
            />
            {/* <Stack.Screen name="SeatSelect" component={SeatSelectScreen} /> */}
            
            <Stack.Screen name="SeatSelect" component={SeatScreen} />
            <Stack.Screen name="Confirm" component={ConfirmScreen1} />
            <Stack.Screen
              name="BookingDetails"
              component={BookingDetailsScreen}
            />
          </Stack.Navigator>
        </StripeProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default StackNavigator;
