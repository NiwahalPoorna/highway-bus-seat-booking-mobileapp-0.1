import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  // TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as yup from "yup";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { Button, TextInput } from "react-native-paper";
import bus from "../../assets/bus.png";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function RegisterScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: async (data) => {
      try {
        await schema.validate(data, { abortEarly: false });
        return {
          values: data,
          errors: {},
        };
      } catch (err) {
        return {
          values: {},
          errors: err.inner.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {}),
        };
      }
    },
  });

  const onSubmit = async (data) => {
    console.log("Data being sent to server:", data);

    try {
      const response = await axios.post(
        "http://192.168.1.47:3000/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Form submission successful
        console.log("Form submitted successfully");
        console.log(response.data); // handle successful response
        // Reset the form fields using reset() method of react-hook-form
        reset();
        navigation.navigate("Login");
      } else {
        // Form submission failed
        console.log("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "The value already exists"
      ) {
        // Handle duplicate key error
        console.log("The value already exists");
      } else {
        // Handle other errors
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        {/* <View style={{ alignItems: "center", marginTop: 30, marginBottom: 50 }}>
          <Image
            source={bus}
            fadeDuration={0}
            style={{ width: 80, height: 80 }}
          />
        </View> */}
        <View style={styles.container}>
          <Text
            style={{
              marginTop: 100,
              fontWeight: "700",
              fontSize: 25,
              marginBottom: 25,
            }}
          >
            Create Account
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Full Name"
                mode="outlined"
                textContentType="name"
                autoCapitalize="words"
                autoCompleteType="name"
                onBlur={onBlur}
                style={styles.input}
                // placeholder="Full Name"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="fullName"
            defaultValue=""
          />
          {errors.fullName && (
            <Text style={styles.error}>{errors.fullName}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                mode="outlined"
                textContentType="emailAddress"
                autoCompleteType="email"
                onBlur={onBlur}
                style={styles.input}
                // placeholder="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Password"
                mode="outlined"
                textContentType="password"
                autoCapitalize="none"
                autoCompleteType="name"
                onBlur={onBlur}
                style={styles.input}
                // placeholder="Password"
                secureTextEntry={true}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Confirm Password"
                mode="outlined"
                textContentType="password"
                autoCapitalize="none"
                autoCompleteType="password"
                onBlur={onBlur}
                style={styles.input}
                // placeholder="Confirm Password"
                secureTextEntry={true}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="confirmPassword"
            defaultValue=""
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}
          {/* <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity> */}

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            Register
          </Button>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
              marginTop: 30,
            }}
          >
            <Text>Already Registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    // width: "80%",
    // height: 50,
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,

    marginBottom: 5,
  },
  // button: {
  //   backgroundColor: "blue",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 18,
  // },
  error: {
    color: "red",
    marginTop: 0,
    marginBottom: 2,
  },
  button: {
    marginTop: 30,
  },
});

export default RegisterScreen;
