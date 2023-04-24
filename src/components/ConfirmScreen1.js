import { View, Text, Button } from "react-native";
import axios from "axios";

import { useSelector } from "react-redux";

import { useStripe } from "@stripe/stripe-react-native";

import React, { useState } from "react";
import { Alert } from "react-native";

const ConfirmScreen1 = () => {
  const busDetails = useSelector((state) => state.bus.busDetails);
  const seatCount = useSelector((state) => state.seatSelector.seatCount);
  const totalPrice2 = useSelector((state) => state.seatSelector.totalPrice);
  const userDetails = useSelector((state) => state.userlog.user);

  console.log(userDetails.email);

  const busDetailsObject = {
    busNumber: busDetails.busNumber,
    origin: busDetails.origin,
    destination: busDetails.destination,
    id: busDetails._id,
    date: busDetails.date,
    startTime: busDetails.startTime,
    arriveTime: busDetails.arriveTime,
    seatCount: seatCount,
    totalPrice: totalPrice2,
    email: userDetails.email,
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const totalPrice = useSelector((state) => state.seatSelector.totalPrice);

  const [paymentIntent, setPaymentIntent] = useState(null);

  const onCheckout = async () => {
    // 1. Create a payment intent

    try {
      const response = await axios.post("http://192.168.1.47:3000/intents", {
        amount: Math.floor(totalPrice * 100),
      });
      if (response.data.error) {
        console.log(response.data.error);
        Alert.alert("Something went wrong", response.data.error);
        return;
      }
      // Handle successful response
      console.log(response.data);
      setPaymentIntent(response.data.paymentIntent);
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong", error.message);
      return;
      // Handle error
    }

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: paymentIntent,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (initResponse?.error) {
      console.log(initResponse.error);
      Alert.alert("Something went wrong", initResponse.error.message);
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const { error: paymentError } = await presentPaymentSheet();

    if (paymentError) {
      console.log(paymentError);
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }

    onBook();

    // 4. If payment is successful, create the order
    // TODO: implement creating an order in your backen
    console.log("Payment successful");
  };

  async function onBook() {
    try {
      const response = await axios.post(
        "http://192.168.1.47:3000/booking",
        busDetailsObject
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // console.log(busDetailsObject);

  // const handlePress = () => {
  //   // navigation.navigate("Checkout");
  // };

  return (
    <View>
      <Text>user email: {userDetails.email}</Text>
      <Text>Bus Number: {busDetails.busNumber}</Text>
      <Text>Start Time: {busDetails.startTime}</Text>
      <Text>Arrive Time: {busDetails.arriveTime}</Text>
      <Text>Price: {busDetails.price}</Text>
      <Text>Other Details: {busDetails.otherDetails}</Text>
      <Text>Number of seats selected: {seatCount}</Text>
      <Text>Total price: {totalPrice}</Text>
      <Button title="Proceed to Checkout" onPress={onCheckout} />
    </View>
  );
};

export default ConfirmScreen1;
