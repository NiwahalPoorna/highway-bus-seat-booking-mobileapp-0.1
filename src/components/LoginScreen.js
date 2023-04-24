import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from 'react-redux';

import { setUser } from "../Slice/authSlice";

import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
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
        navigation.navigate('Search');

      }
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Invalid email or password");
        alert("Invalid email or password");
      } else {
        console.log("Internal server error",error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginTop: 20,
  },
});

export default LoginScreen;
