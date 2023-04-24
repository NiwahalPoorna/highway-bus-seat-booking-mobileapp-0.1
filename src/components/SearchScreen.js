import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [buses, setBuses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    setSelectedDate(date || selectedDate);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const dateStr = selectedDate.toISOString()
  // const dateParam = dateStr.slice(0, 10);
  const dateParam = selectedDate.toISOString().slice(0, 10);
  const searchBuses = async (values) => {
    console.log(values, selectedDate);
    try {
      const response = await axios.get(
        `http://192.168.1.47:3000/buses?origin=${values.origin}&destination=${values.destination}&date=${dateParam}`
      );
      setBuses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePickerOpen = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Controller
          control={control}
          name="origin"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter origin"
              style={styles.textInput}
            />
          )}
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.origin && <Text style={styles.error}>Origin is required</Text>}
        <Controller
          control={control}
          name="destination"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter destination"
              style={styles.textInput}
            />
          )}
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.destination && (
          <Text style={styles.error}>Destination is required</Text>
        )}
        <TouchableOpacity
          onPress={handleDatePickerOpen}
          style={styles.datePickerButton}
        >
          <Text style={styles.datePickerButtonText}>
            Select date: {selectedDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
        <Button
          onPress={handleSubmit(searchBuses)}
          title="Search"
          style={styles.button}
        />
      </View>
      <View style={styles.listContainer}>
        <ScrollView style={styles.ScrollView}>
          {buses.map((bus) => (
            <TouchableOpacity
              key={bus._id}
              onPress={() => navigation.navigate("Details", { bus: bus })}
            >
              <Card title={bus.busNumber} containerStyle={styles.card}>
                <Text>Start time: {bus.startTime}</Text>
                <Text>Arrival time: {bus.arriveTime}</Text>
                <Text>Price: {bus.price}</Text>
                <Text>Other specific details: {bus.otherDetails}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#000",
  },

  button: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  datePickerButton: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerButtonText: {
    fontSize: 16,
    color: "#000",
  },

  listContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flex: 1,
  },
});

export default SearchScreen;
