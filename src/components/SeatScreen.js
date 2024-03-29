import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addSeat, removeSeat, selectSeats, selectTotalPrice, setPrice } from "../Slice/seatSlice";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import {BASE_URL} from "@env";

const SeatScreen = () => {
  const selectedSeats = useSelector(selectSeats);
  const busDetails = useSelector((state) => state.bus.busDetails);
  const userDetails = useSelector((state) => state.userlog.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setPrice(busDetails.price));
  }, [busDetails.price, dispatch]);

  const [bookedSeats, setBookedSeats] = useState([]);

  // 192.168.1.47   http://192.168.1.47:3000/booking/seats?date=2023-05-01&startTime=8:00AM&busNumber=BUS100
  useEffect(() => {
    // Fetch the booked seats for the specific bus and date using Axios GET request
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(
          `http://192.168.8.192:3000/booking/seats?date=${busDetails.date}&busNumber=${busDetails.busNumber}&startTime=${busDetails.startTime}&email=${userDetails.email}`
        );
        const bookings = response.data;
        // const bookedSeatNumbers = bookings.map((booking) => booking.seats).flat();
        setBookedSeats(bookings);
        console.log(bookings)
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };

    fetchBookedSeats();
  }, [busDetails.date, busDetails.busNumber, busDetails.startTime]);

  const handleSeatPress = (seatIndex) => {
    if (bookedSeats.includes(seatIndex)) {
      return; // Do not allow selecting booked seats
    }

    if (selectedSeats.includes(seatIndex)) {
      dispatch(removeSeat(seatIndex));
    } else {
      dispatch(addSeat(seatIndex));
    }
  };

  const totalSeats = 66;
  const maxSeatsPerRow = 6;

  const rows = Math.ceil(totalSeats / maxSeatsPerRow);

  const emptySeatPositions = [3, 9, 15, 21, 27, 33, 39, 45, 51, 55, 56, 57];

  const totalPrice = useSelector(selectTotalPrice);

  const handleProceed = () => {
    navigation.navigate("Confirm");
  };

  return (
    <View style={styles.container}>
      <View style={styles.seatContainer}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {[...Array(maxSeatsPerRow)].map((_, seatIndex) => {
              const actualSeatIndex = rowIndex * maxSeatsPerRow + seatIndex;
              if (actualSeatIndex < totalSeats) {
                const isSeatEmpty = emptySeatPositions.includes(
                  actualSeatIndex + 1
                );
                if (isSeatEmpty) {
                  return <View key={seatIndex} style={styles.emptySeat} />;
                } else {
                  const isSeatBooked = bookedSeats.includes(actualSeatIndex);
                  const isSeatSelected = selectedSeats.includes(actualSeatIndex);
                  return (
                    <TouchableOpacity
                      key={actualSeatIndex}
                      style={[
                        styles.seat,
                        isSeatSelected && styles.selectedSeat,
                        isSeatBooked && styles.bookedSeat,
                      ]}
                      onPress={() => handleSeatPress(actualSeatIndex)}
                      disabled={isSeatBooked}
                    >
                      <Text style={styles.seatText}>
                        {actualSeatIndex}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              } else {
                return null;
              }
            })}
          </View>
        ))}
      </View>

      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.selectedSeatsText}>
          Selected Seats: {selectedSeats.length} seat(s)
        </Text>
      </View>
      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.selectedSeatsText}>
          Selected Seats: {selectedSeats.map((seat) => seat).join(", ")}
        </Text>
      </View>
      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.selectedSeatsText}>
          Total Price: ${totalPrice}
        </Text>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: "center",
  },
  seatContainer: {
    marginTop: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  seat: {
    width: 27,
    height: 25,
    margin: 4,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSeat: {
    backgroundColor: "green",
  },
  bookedSeat: {
    backgroundColor: "red",
  },
  seatText: {
    fontSize: 12,
  },
  emptySeat: {
    width: 27,
    height: 25,
    margin: 4,
    backgroundColor: "transparent",
  },
  selectedSeatsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  selectedSeatsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  proceedButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SeatScreen;




































































// import React, { useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { addSeat, removeSeat, selectSeats, selectTotalPrice, setPrice } from "../Slice/seatSlice";

// import { useNavigation } from "@react-navigation/native";

// const SeatScreen = () => {
//   const selectedSeats = useSelector(selectSeats);
//   const busDetails = useSelector((state) => state.bus.busDetails);
//   const dispatch = useDispatch();

//   const navigation = useNavigation();

//   useEffect(() => {
//     dispatch(setPrice(busDetails.price));
//   }, [busDetails.price, dispatch]);

//   const handleSeatPress = (seatIndex) => {
//     if (selectedSeats.includes(seatIndex)) {
//       dispatch(removeSeat(seatIndex));
//     } else {
//       dispatch(addSeat(seatIndex));
//     }
//   };

 

//   const totalSeats = 66;
//   const maxSeatsPerRow = 6;

//   const rows = Math.ceil(totalSeats / maxSeatsPerRow);

//   const emptySeatPositions = [3, 9, 15, 21, 27, 33, 39, 45, 51, 55, 56, 57];

//   const totalPrice = useSelector(selectTotalPrice);


//   const handleProceed = () => {
//     navigation.navigate("Confirm");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.seatContainer}>
//         {[...Array(rows)].map((_, rowIndex) => (
//           <View key={rowIndex} style={styles.row}>
//             {[...Array(maxSeatsPerRow)].map((_, seatIndex) => {
//               const actualSeatIndex = rowIndex * maxSeatsPerRow + seatIndex;
//               if (actualSeatIndex < totalSeats) {
//                 const isSeatEmpty = emptySeatPositions.includes(
//                   actualSeatIndex + 1
//                 );
//                 if (isSeatEmpty) {
//                   return <View key={seatIndex} style={styles.emptySeat} />;
//                 } else {
//                   return (
//                     <TouchableOpacity
//                       key={actualSeatIndex}
//                       style={[
//                         styles.seat,
//                         selectedSeats.includes(actualSeatIndex) &&
//                           styles.selectedSeat,
//                       ]}
//                       onPress={() => handleSeatPress(actualSeatIndex)}
//                     >
//                       <Text style={styles.seatText}>
//                         {actualSeatIndex }
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 }
//               } else {
//                 return null;
//               }
//             })}
//           </View>
//         ))}
//       </View>

//       <View style={styles.selectedSeatsContainer}>
//         <Text style={styles.selectedSeatsText}>
//           Selected Seats: {selectedSeats.length} seat(s)
//         </Text>
//       </View>
//       <View style={styles.selectedSeatsContainer}>
//         <Text style={styles.selectedSeatsText}>
//           Selected Seats: {selectedSeats.map((seat) => seat).join(", ")}
//         </Text>
//       </View>
//       <View style={styles.selectedSeatsContainer}>
//         <Text style={styles.selectedSeatsText}>
//           Total Price: ${totalPrice}
//         </Text>

//         <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
//         <Text style={styles.proceedButtonText}>Proceed</Text>
//       </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 60,
//     alignItems: "center",
//   },
//   seatContainer: {
//     marginTop: 1,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 5,
//   },
//   seat: {
//     width: 27,
//     height: 25,
//     margin: 4,
//     backgroundColor: "lightgray",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   selectedSeat: {
//     backgroundColor: "green",
//   },
//   seatText: {
//     fontSize: 12,
//   },
//   emptySeat: {
//     width: 27,
//     height: 25,
//     margin: 4,
//     backgroundColor: "transparent",
//   },
//   selectedSeatsContainer: {
//     marginTop: 10,
//     paddingHorizontal: 10,
//     backgroundColor: "lightgray",
//     borderRadius: 5,
//   },
//   selectedSeatsText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   proceedButton: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   proceedButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// export default SeatScreen;
