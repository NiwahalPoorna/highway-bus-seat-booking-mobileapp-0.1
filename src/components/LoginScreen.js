import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setUser } from "../Slice/authSlice";

import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import bus from "../../assets/bus.png";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ validationSchema });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://192.168.1.47:3000/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Login successful!");
        dispatch(setUser(data));
        reset();
        navigation.navigate("Search2");
      }
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Invalid email or password");
        alert("Invalid email or password");
      } else {
        console.log("Internal server error", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginBottom: 50 }}>
          <Image
            source={bus}
            fadeDuration={0}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              error={!!errors.email}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              textContentType="password"
              error={!!errors.password}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit(handleLogin)}
          style={styles.button}
        >
          Login
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
});

export default LoginScreen;
