import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import { useSelector } from "react-redux";

import { useStripe } from "@stripe/stripe-react-native";

import React, { useState } from "react";
import { Alert } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import downarrow from "../../assets/down-arrow.png";

const ConfirmScreen1 = () => {
  const navigation = useNavigation();

  const busDetails = useSelector((state) => state.bus.busDetails);
  // const seatCount = useSelector((state) => state.seatSelector.seatCount);
  // const totalPrice2 = useSelector((state) => state.seatSelector.totalPrice);
  const userDetails = useSelector((state) => state.userlog.user);

  const selectedSeats = useSelector((state) => state.seat.seats);
  const totalPrice3 = useSelector((state) => state.seat.totalPrice);

  // console.log(userDetails.email);

  console.log(selectedSeats);
  console.log(selectedSeats.length);
  console.log(totalPrice3);

  const busDetailsObject = {
    busNumber: busDetails.busNumber,
    origin: busDetails.origin,
    destination: busDetails.destination,
    id: busDetails._id,
    date: busDetails.date,
    startTime: busDetails.startTime,
    arriveTime: busDetails.arriveTime,
    seatCount: selectedSeats.length,
    totalPrice: totalPrice3,
    email: userDetails.email,
    seats: selectedSeats,
    // status:true,
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // const totalPrice = useSelector((state) => state.seatSelector.totalPrice);

  const [paymentIntent, setPaymentIntent] = useState(null);

  const onCheckout = async () => {
    // 1. Create a payment intent

    try {
      const response = await axios.post("http://192.168.1.47:3000/intents", {
        amount: Math.floor(totalPrice3 * 100),
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

      if (response.status === 200) {
        console.log("Booking successful!");
        Alert.alert("Booking Successful", "Your booking has been confirmed.", [
          { text: "OK", onPress: () => navigation.navigate("Booked") },
        ]);
      }
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
    <SafeAreaView>


        
      <View
        style={{
          backgroundColor: "white",
          height: "90%",
          margin: 10,
          borderRadius: 6,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {busDetails.origin}
          </Text>

          <Text>{selectedSeats.length}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Image
            source={downarrow}
            fadeDuration={0}
            style={{ width: 30, height: 30 }}
          />

          <Text style={{ color: "red", fontSize: 16 }}>BUS TICKET</Text>
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginHorizontal: 10,
            marginTop: 9,
          }}
        >
          {busDetails.destination}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginHorizontal: 10,
            marginTop: 9,
          }}
        >
          Date : {busDetails.date}
        </Text>

        <Text
         style={{
            fontSize: 15,
            fontWeight: "600",
            marginHorizontal: 10,
            marginTop: 9,
          }}>
        Selected Seats: {selectedSeats.map((seat) => seat).join(", ")}
      </Text>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 5,
            margin: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
              startTime
            </Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>
              {busDetails.startTime}
            </Text>
          </View>
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
              arriveTime
            </Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>
              {busDetails.arriveTime}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
              Origin
            </Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>
              {busDetails.origin}
            </Text>
          </View>
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
              destination
            </Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>
              {busDetails.destination}
            </Text>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 5,
            margin: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginLeft: 14 }}>
            <Text>BUS NO</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              {busDetails.busNumber}
            </Text>
          </View>

          <View>
            <Text>TICKETS</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              {selectedSeats.length}
            </Text>
          </View>

          <View style={{ marginRight: 15 }}>
            <Text>SEATS</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  margin: 3,
                  fontSize: 15,
                  fontWeight: "bold",
                  marginTop: 6,
                }}
              >
                {selectedSeats.length}
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 5,
            margin: 10,
          }}
        />

        <View
          style={{
            height: 140,
            backgroundColor: "#8DA399",
            borderRadius: 6,
            margin: 10,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Price Details
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                User E-mail
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                {userDetails.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Seat Count
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                {selectedSeats.length}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Ticket Price
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                {busDetails.price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Grand Total
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                RS.{totalPrice3}.00
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 5,
            margin: 10,
          }}
        />
      </View>

      
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 40,
        }}
      >
        {/* button */}
        <TouchableOpacity onPress={onCheckout}>
          <View
            style={{
              height: 60,
              marginHorizontal: 20,
              backgroundColor: "#ae1515",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Pay</Text>
          </View>
        </TouchableOpacity>
      </View>

     
    </SafeAreaView>
    // <View>
    //   <Text>user email: {userDetails.email}</Text>
    //   <Text>Bus Number: {busDetails.busNumber}</Text>
    //   <Text>Start Time: {busDetails.startTime}</Text>
    //   <Text>Arrive Time: {busDetails.arriveTime}</Text>
    //   <Text>Price: {busDetails.price}</Text>
    //   <Text>Other Details: {busDetails.otherDetails}</Text>
    //   <Text>Number of seats selected: {seatCount}</Text>
    //   <Text>Total price: {totalPrice}</Text>
    //   <Button title="Proceed to Checkout" onPress={onCheckout} />
    // </View>
  );
};

export default ConfirmScreen1;









































// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import axios from "axios";

// import { useSelector } from "react-redux";

// import { useStripe } from "@stripe/stripe-react-native";

// import React, { useState } from "react";
// import { Alert } from "react-native";

// import { useRoute } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";

// import downarrow from "../../assets/down-arrow.png";

// const ConfirmScreen1 = () => {
//   const navigation = useNavigation();

//   const busDetails = useSelector((state) => state.bus.busDetails);
//   const seatCount = useSelector((state) => state.seatSelector.seatCount);
//   const totalPrice2 = useSelector((state) => state.seatSelector.totalPrice);
//   const userDetails = useSelector((state) => state.userlog.user);

//   console.log(userDetails.email);

//   const busDetailsObject = {
//     busNumber: busDetails.busNumber,
//     origin: busDetails.origin,
//     destination: busDetails.destination,
//     id: busDetails._id,
//     date: busDetails.date,
//     startTime: busDetails.startTime,
//     arriveTime: busDetails.arriveTime,
//     seatCount: seatCount,
//     totalPrice: totalPrice2,
//     email: userDetails.email,
//     // status:true,
//   };

//   const { initPaymentSheet, presentPaymentSheet } = useStripe();

//   const totalPrice = useSelector((state) => state.seatSelector.totalPrice);

//   const [paymentIntent, setPaymentIntent] = useState(null);

//   const onCheckout = async () => {
//     // 1. Create a payment intent

//     try {
//       const response = await axios.post("http://192.168.1.47:3000/intents", {
//         amount: Math.floor(totalPrice * 100),
//       });
//       if (response.data.error) {
//         console.log(response.data.error);
//         Alert.alert("Something went wrong", response.data.error);
//         return;
//       }
//       // Handle successful response
//       console.log(response.data);
//       setPaymentIntent(response.data.paymentIntent);
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Something went wrong", error.message);
//       return;
//       // Handle error
//     }

//     // 2. Initialize the Payment sheet
//     const initResponse = await initPaymentSheet({
//       merchantDisplayName: "Example, Inc.",
//       paymentIntentClientSecret: paymentIntent,
//       defaultBillingDetails: {
//         name: "Jane Doe",
//       },
//     });
//     if (initResponse?.error) {
//       console.log(initResponse.error);
//       Alert.alert("Something went wrong", initResponse.error.message);
//       return;
//     }

//     // 3. Present the Payment Sheet from Stripe
//     const { error: paymentError } = await presentPaymentSheet();

//     if (paymentError) {
//       console.log(paymentError);
//       Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
//       return;
//     }

//     onBook();

//     // 4. If payment is successful, create the order
//     // TODO: implement creating an order in your backen
//     console.log("Payment successful");
//   };

//   async function onBook() {
//     try {
//       const response = await axios.post(
//         "http://192.168.1.47:3000/booking",
//         busDetailsObject
//       );

//       if (response.status === 200) {
//         console.log("Booking successful!");
//         Alert.alert("Booking Successful", "Your booking has been confirmed.", [
//           { text: "OK", onPress: () => navigation.navigate("Booked") },
//         ]);
//       }
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // console.log(busDetailsObject);

//   // const handlePress = () => {
//   //   // navigation.navigate("Checkout");
//   // };

//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           backgroundColor: "white",
//           height: "90%",
//           margin: 10,
//           borderRadius: 6,
//         }}
//       >
//         <View
//           style={{
//             padding: 10,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Text style={{ fontSize: 16, fontWeight: "500" }}>
//             {busDetails.origin}
//           </Text>

//           <Text>{seatCount}</Text>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginHorizontal: 10,
//           }}
//         >
//           <Image
//             source={downarrow}
//             fadeDuration={0}
//             style={{ width: 30, height: 30 }}
//           />

//           <Text style={{ color: "red", fontSize: 16 }}>BUS TICKET</Text>
//         </View>

//         <Text
//           style={{
//             fontSize: 15,
//             fontWeight: "600",
//             marginHorizontal: 10,
//             marginTop: 9,
//           }}
//         >
//           {busDetails.destination}
//         </Text>
//         <Text
//           style={{
//             fontSize: 15,
//             fontWeight: "600",
//             marginHorizontal: 10,
//             marginTop: 9,
//           }}
//         >
//           Date : {busDetails.date}
//         </Text>

//         <Text
//           style={{
//             borderRadius: 1,
//             borderStyle: "dashed",
//             borderColor: "#DCDCDC",
//             height: 1,
//             borderWidth: 5,
//             margin: 10,
//           }}
//         />

//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <View style={{ marginTop: 10, marginLeft: 10 }}>
//             <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
//               startTime
//             </Text>
//             <Text style={{ marginVertical: 4, fontSize: 16 }}>
//               {busDetails.startTime}
//             </Text>
//           </View>
//           <View style={{ marginTop: 10, marginLeft: 10 }}>
//             <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
//               arriveTime
//             </Text>
//             <Text style={{ marginVertical: 4, fontSize: 16 }}>
//               {busDetails.arriveTime}
//             </Text>
//           </View>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <View style={{ marginTop: 10, marginLeft: 10 }}>
//             <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
//               Origin
//             </Text>
//             <Text style={{ marginVertical: 4, fontSize: 16 }}>
//               {busDetails.origin}
//             </Text>
//           </View>
//           <View style={{ marginTop: 10, marginLeft: 10 }}>
//             <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
//               destination
//             </Text>
//             <Text style={{ marginVertical: 4, fontSize: 16 }}>
//               {busDetails.destination}
//             </Text>
//           </View>
//         </View>

//         <Text
//           style={{
//             borderRadius: 1,
//             borderStyle: "dashed",
//             borderColor: "#DCDCDC",
//             height: 1,
//             borderWidth: 5,
//             margin: 10,
//           }}
//         />
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <View style={{ marginLeft: 14 }}>
//             <Text>BUS NO</Text>
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: 15,
//                 fontWeight: "bold",
//                 marginTop: 6,
//               }}
//             >
//               {busDetails.busNumber}
//             </Text>
//           </View>

//           <View>
//             <Text>TICKETS</Text>
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: 15,
//                 fontWeight: "bold",
//                 marginTop: 6,
//               }}
//             >
//               {seatCount}
//             </Text>
//           </View>

//           <View style={{ marginRight: 15 }}>
//             <Text>SEATS</Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text
//                 style={{
//                   margin: 3,
//                   fontSize: 15,
//                   fontWeight: "bold",
//                   marginTop: 6,
//                 }}
//               >
//                 {seatCount}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <Text
//           style={{
//             borderRadius: 1,
//             borderStyle: "dashed",
//             borderColor: "#DCDCDC",
//             height: 1,
//             borderWidth: 5,
//             margin: 10,
//           }}
//         />

//         <View
//           style={{
//             height: 140,
//             backgroundColor: "#8DA399",
//             borderRadius: 6,
//             margin: 10,
//           }}
//         >
//           <View style={{ padding: 10 }}>
//             <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//               Price Details
//             </Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginTop: 4,
//               }}
//             >
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 User E-mail
//               </Text>
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 {userDetails.email}
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginTop: 4,
//               }}
//             >
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 Seat Count
//               </Text>
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 {seatCount}
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginTop: 4,
//               }}
//             >
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 Ticket Price
//               </Text>
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 {busDetails.price}
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginTop: 4,
//               }}
//             >
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 Grand Total
//               </Text>
//               <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
//                 RS.{totalPrice}.00
//               </Text>
//             </View>
//           </View>
//         </View>

//         <Text
//           style={{
//             borderRadius: 1,
//             borderStyle: "dashed",
//             borderColor: "#DCDCDC",
//             height: 1,
//             borderWidth: 5,
//             margin: 10,
//           }}
//         />
//       </View>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "flex-end",
//           paddingBottom: 40,
//         }}
//       >
//         {/* button */}
//         <TouchableOpacity onPress={onCheckout}>
//           <View
//             style={{
//               height: 60,
//               marginHorizontal: 20,
//               backgroundColor: "#ae1515",
//               borderRadius: 15,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 18 }}>Pay</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//     // <View>
//     //   <Text>user email: {userDetails.email}</Text>
//     //   <Text>Bus Number: {busDetails.busNumber}</Text>
//     //   <Text>Start Time: {busDetails.startTime}</Text>
//     //   <Text>Arrive Time: {busDetails.arriveTime}</Text>
//     //   <Text>Price: {busDetails.price}</Text>
//     //   <Text>Other Details: {busDetails.otherDetails}</Text>
//     //   <Text>Number of seats selected: {seatCount}</Text>
//     //   <Text>Total price: {totalPrice}</Text>
//     //   <Button title="Proceed to Checkout" onPress={onCheckout} />
//     // </View>
//   );
// };

// export default ConfirmScreen1;
