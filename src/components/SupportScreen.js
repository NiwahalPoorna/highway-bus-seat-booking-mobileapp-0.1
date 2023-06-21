import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

const SupportScreen = () => {
  const handleSupportButtonPress = () => {
    const phoneNumber = "1234567890"; // Replace with your support team's phone number
    const dialNumber = `tel:${phoneNumber}`;

    Linking.openURL(dialNumber);
  };

  const handleEmergencyButtonPress = () => {
    const emergencyNumber = "911"; // Replace with the emergency phone number
    const dialNumber = `tel:${emergencyNumber}`;

    Linking.openURL(dialNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.description}>
        If you have any questions or need assistance, please contact our support
        team.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSupportButtonPress}
      >
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Emergency </Text>
      <Text style={styles.description}>Emergency Support</Text>
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={handleEmergencyButtonPress}
      >
        <Text style={styles.buttonText}>Emergency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#7996d4",
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  emergencyButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SupportScreen;
