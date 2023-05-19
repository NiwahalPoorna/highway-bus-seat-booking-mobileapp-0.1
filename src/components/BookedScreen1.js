import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "react-native-elements";

import { Image } from "react-native";
import rightarrow from "../../assets/right-arrow.png";

const BookedScreen1 = ({ navigation }) => {
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userDetails = useSelector((state) => state.userlog.user);

  const email = userDetails?.email;

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.47:3000/booking/details?email=${email}`
        );
        setBookingData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };
    if (email) {
      fetchBookingData();
    }
  }, [email]);

  const handleCardClick = (booking) => {
    // Navigate to the details screen with the selected booking data
    navigation.navigate("BookingDetails", { booking });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Booking data for {email}:</Text> */}
      {isLoading ? (
        <Text style={styles.loadingText}>Loading booking data...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      ) : bookingData.length > 0 ? (
        bookingData.map((booking, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardClick(booking)}
          >
            {/* <View style={styles.card}>
              {/* <Text style={styles.cardText}>Booking ID: {booking._id}</Text>
              <Text style={styles.cardText}>Booking Date: {booking.date}</Text>
              <Text style={styles.cardText}>
                Booking Time: {booking.arrivetime}
              </Text> */}
            {/* Render other booking details here */}
            {/* </View> */}

            <View style={styles.containercard}>
              <Card containerStyle={styles.card}>
                <View style={styles.titleContainer}>
                  <Text style={styles.originText}>{booking.origin}</Text>
                  <Image
                    source={rightarrow}
                    fadeDuration={0}
                    style={{ width: 30, height: 30 }}
                  />

                  <Text style={styles.destinationText}>
                    {booking.destination}
                  </Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.startText}>Start Time</Text>

                  <Text style={styles.arriveText}>arriveTime</Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.starttime}>{booking.startTime}</Text>

                  <Text style={styles.arrivetime}>{booking.arriveTime}</Text>
                </View>

                <Text
                  style={{
                    borderRadius: 1,
                    borderStyle: "dashed",
                    borderColor: "#DCDCDC",
                    height: 1,
                    borderWidth: 3,
                    margin: 10,
                  }}
                />
                <View style={styles.detailContainer1}>
                  <Text style={styles.date}>Date: {booking.date} </Text>
                </View>
                <View style={styles.detailContainer1}>
                  <Text style={styles.busno}>BUS No: {booking.busNumber}</Text>
                </View>
                <View style={styles.detailContainer1}>
                  <Text style={styles.bookedid}>BOOKED ID: {booking._id}</Text>
                </View>

                <Text
                  style={{
                    borderRadius: 1,
                    borderStyle: "dashed",
                    borderColor: "#DCDCDC",
                    height: 1,
                    borderWidth: 3,
                    margin: 10,
                  }}
                />
                <View style={styles.detailContainer1}>
                  <Text style={styles.bookedstatus}>STATUS</Text>
                </View>
                <View style={styles.detailContainer1}>
                  <Text style={styles.bookedstatus}>ACCEPT</Text>
                </View>
              </Card>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>No bookings found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flexGrow: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },
  // card: {
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   padding: 20,
  //   marginBottom: 10,
  //   width: "80%",
  //   alignItems: "flex-start",
  // },
  // cardText: {
  //   fontSize: 16,
  //   marginBottom: 5,
  // },

  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
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
    marginRight: 50,
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
    marginLeft: 130,
    marginTop: 15,
  },
  arrivetime: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 130,
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
  busno: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
  },
  bookedid: {
    fontSize: 15,
    fontWeight: "bold",

    marginTop: 15,
  },
  bookedstatus: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 100,
  },
});

export default BookedScreen1;
