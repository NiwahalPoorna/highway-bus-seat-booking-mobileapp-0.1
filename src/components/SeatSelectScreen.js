import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateSeatCount, updateTotalPrice } from "../Slice/SeatSelectorSlice";

import { useNavigation } from "@react-navigation/native";

function SeatSelectScreen({ onNext }) {
  const navigation = useNavigation();

  const ticketPrice = useSelector((state) => state.bus.busDetails.price);
  const seatCount = useSelector((state) => state.seatSelector.seatCount);
  const totalPrice = useSelector((state) => state.seatSelector.totalPrice);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    const newSeatCount = seatCount + 1;
    console.log(newSeatCount);
    dispatch(updateSeatCount(newSeatCount));
    dispatch(updateTotalPrice(newSeatCount * ticketPrice));
  };

  const handleDecrement = () => {
    if (seatCount > 0) {
      const newSeatCount = seatCount - 1;
      console.log(newSeatCount);
      dispatch(updateSeatCount(newSeatCount));
      dispatch(updateTotalPrice(newSeatCount * ticketPrice));
    }
  };

  const handleNext = () => {
    if (typeof onNext === "function") {
      onNext(seatCount, totalPrice);
    }
    navigation.navigate("Confirm");
  };

  return (
    <View>
      <Text>Number of seats selected: {seatCount}</Text>
      <Text>Ticket price: {ticketPrice}</Text>
      <Text>Total price: {totalPrice}</Text>
      <TouchableOpacity onPress={handleIncrement}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDecrement}>
        <Text>-</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SeatSelectScreen;
