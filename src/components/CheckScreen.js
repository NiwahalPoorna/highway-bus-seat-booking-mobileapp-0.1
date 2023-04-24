import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Alert } from "react-native";


const CheckScreen = () => {
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

    // 4. If payment is successful, create the order
    // TODO: implement creating an order in your backen
     console.log("Payment successful");
  };

  return (
    <View>
      <Pressable onPress={onCheckout}>
        <Text>Checkout</Text>
      </Pressable>
    </View>
  );
};

export default CheckScreen;














































































// import React, { useState, useEffect } from "react";
// import { View, Text, Button } from "react-native";
// import { useStripe } from "@stripe/stripe-react-native";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const CheckoutScreen = () => {
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);
//   const [paymentIntent, setPaymentIntent] = useState(null);
//   const totalPrice = useSelector((state) => state.seatSelector.totalPrice);
//   const [bookingCompleted, setBookingCompleted] = useState(false);

//   const createPaymentIntent = async (amount) => {
//     try {
//       const response = await axios.post(
//         "http://192.168.1.47:3000/payments/intent",
//         {
//           amount: amount,
//         }
//       );
//       return response.data.client_secret;
//     } catch (error) {
//       console.log(error);
//       // Handle the error, e.g. show an error message to the user
//       throw error; // rethrow the error so it can be caught in the calling function
//     }
//   };

//   const initializePaymentSheet = async () => {
//     const clientSecret = await createPaymentIntent(totalPrice * 100); // Multiply by 100 to convert to cents
//     const { error } = await initPaymentSheet({
//       paymentIntentClientSecret: clientSecret,
//     });
//     if (!error) {
//       setLoading(true);
//     }
//   };

//   const openPaymentSheet = async () => {
//     const clientSecret = await createPaymentIntent(totalPrice * 100); // Multiply by 100 to convert to cents
//     const { error, paymentIntent } = await presentPaymentSheet({
//       paymentIntentClientSecret: clientSecret,
//     });
//     if (error) {
//       console.log(error);
//     } else {
//       setPaymentIntent(paymentIntent);
//       setBookingCompleted(true);
//     }
//   };

//   const sendBookingDetails = async () => {
//     // const bookingDetails = {
//     //   // Include relevant booking details here, e.g. seat numbers, showtime, etc.
//     // };
//     // const response = await axios.post('https://your-api.com/bookings', bookingDetails);
//     console.log(paymentIntent);
//   };

//   useEffect(() => {
//     initializePaymentSheet();
//   }, []);

//   useEffect(() => {
//     if (bookingCompleted) {
//       sendBookingDetails();
//     }
//   }, [bookingCompleted]);

//   return (
//     <View>
//       <Text>Checkout Screen</Text>
//       <Text>Total Price: {totalPrice}</Text>
//       <Button title="Checkout" onPress={openPaymentSheet} disabled={!loading} />
//     </View>
//   );
// };

// export default CheckoutScreen;
