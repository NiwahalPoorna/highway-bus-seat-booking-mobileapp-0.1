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
import { Image } from "react-native";
import rightarrow from "../../assets/right-arrow.png";

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
              label="Origin"
              autoCompleteType="street-address"
              keyboardType="default"
              textContentType="fullStreetAddress"
              mode="outlined"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              // placeholder="Enter origin"
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
              label="Destination"
              autoCompleteType="street-address"
              keyboardType="default"
              textContentType="fullStreetAddress"
              mode="outlined"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              // placeholder="Enter destination"
              style={styles.textInput}
            />
          )}
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.destination && (
          <Text style={styles.error}>Destination is required</Text>
        )}
        <View style={styles.searchContainer1}>
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
      </View>

      <View style={styles.listContainer}>
        <ScrollView style={styles.ScrollView}>
          {buses.map((bus) => (
            <TouchableOpacity
              key={bus._id}
              onPress={() => navigation.navigate("Details", { bus: bus })}
            >
              {/* <Card title={bus.busNumber} containerStyle={styles.card}>
                <Text>Start time: {bus.startTime}</Text>
                <Text>Arrival time: {bus.arriveTime}</Text>
                <Text>Price: {bus.price}</Text>
                <Text>Other specific details: {bus.otherDetails}</Text>
              </Card> */}
              <View style={styles.containercard}>
                {/* <KeyboardAvoidingView containerStyle={styles.card}> */}
                <Card containerStyle={styles.card}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.originText}>Kadawatha</Text>
                    <Image
                      source={rightarrow}
                      fadeDuration={0}
                      style={{ width: 30, height: 30 }}
                    />

                    <Text style={styles.destinationText}>Maharagama</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.startText}>Start Time</Text>

                    <Text style={styles.arriveText}>Arrive Time</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.starttime}>{bus.startTime}</Text>

                    <Text style={styles.arrivetime}>{bus.arriveTime}</Text>
                  </View>
                  <View style={styles.detailContainer1}>
                    <Text style={styles.date}>Date:{bus.date} </Text>
                  </View>
                  <View style={styles.detailContainer1}>
                    <Text style={styles.price}>RS.{bus.price}.00</Text>
                  </View>
                </Card>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
  },

  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 7,
    marginRight: 10,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: "#000",
  },
  error: {
    color: "red",
  },
  listContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 1,
    paddingVertical: 7,
  },
  searchContainer: {
    flex: 1,
    padding: 20,
  },
  containercard: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 30,
  },
  startText: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 30,
    marginTop: 15,
  },
  starttime: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 30,
    marginTop: 2,
  },

  destinationText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 50,
  },
  arriveText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 100,
    marginTop: 15,
  },
  arrivetime: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 120,
    marginTop: 2,
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  date: {
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  detailContainer1: {
    marginTop: 10,
  },
});

export default SearchScreen;
