import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";

const BookingDetailsScreen = ({ route }) => {
  const { booking } = route.params;

  const email = booking.email;
  const bookingId = booking._id;

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          value={`Email: ${email}\nBooking ID: ${bookingId}`}
          size={200}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Booking Details</Text>

        <Text style={styles.details}>Booking Email: {booking.email}</Text>
        <Text style={styles.details}>Booking Date: {booking.date}</Text>

        {/* Render other booking details here */}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginTop: 10, marginLeft: 10, marginRight: 100 }}>
          <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
            Origin
          </Text>
          <Text style={{ marginVertical: 4, fontSize: 16 }}>
            {booking.origin}
          </Text>
        </View>
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
            Destination
          </Text>
          <Text style={{ marginVertical: 4, fontSize: 16 }}>
            {booking.destination}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  qrContainer: {
    marginVertical: 40,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default BookingDetailsScreen;
