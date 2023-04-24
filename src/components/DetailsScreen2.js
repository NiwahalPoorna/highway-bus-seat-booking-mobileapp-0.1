import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { addBusDetails } from "../Slice/busSlice";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const route = useRoute();
  const { bus } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNext = () => {
    dispatch(addBusDetails(bus));
    navigation.navigate('SeatSelect');
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bus.busNumber}</Text>
      <Text style={styles.text}>Start time: {bus.startTime}</Text>
      <Text style={styles.text}>Arrival time: {bus.arriveTime}</Text>
      <Text style={styles.text}>Price: {bus.price}</Text>
      <Text style={styles.text}>Other specific details: {bus.otherDetails}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default DetailsScreen;
