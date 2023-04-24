import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import axios from "axios";

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
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="fullName"
        defaultValue=""
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
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
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default RegisterScreen;
