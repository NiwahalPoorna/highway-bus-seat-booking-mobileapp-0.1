import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addBusDetails } from "../Slice/busSlice";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import rightarrow from "../../assets/right-arrow.png";
import right from "../../assets/right.png";
import maps from "../../assets/google-maps.png";

const DetailsScreen = () => {
  const route = useRoute();
  const { bus } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNext = () => {
    dispatch(addBusDetails(bus));
    navigation.navigate("SeatSelect");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text> Header</Text> */}
        <View style={styles.titleContainer}>
          <Text style={styles.originText}>Kadawatha</Text>
          <Image
            source={right}
            fadeDuration={0}
            style={{ width: 40, height: 25 }}
          />
          <Text style={styles.destinationText}>Maharagama</Text>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.originText}>ORIGIN</Text>

              <Text style={styles.destinationText}>DESTINATION</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.originText}>Kadawatha</Text>

              <Text style={styles.destinationText}>Maharagama</Text>
            </View>
            <View style={styles.titleContainer1}>
              <Text style={styles.originText}>Start Time</Text>

              <Text style={styles.destinationText}>Arrive Time</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.originText}>{bus.startTime} </Text>

              <Text style={styles.destinationText}>{bus.arriveTime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.box1}>
          <View style={styles.innerContainer1}>
            <Text style={styles.priceText}>RS.{bus.price}.00</Text>
            <Text style={styles.dateText}>Date : {bus.date}</Text>
            <Text style={styles.busnoText}>Bus No :{bus.busNumber} </Text>
            <Text style={styles.descriptionText}>
              Other Details: A bus seat booking app is a mobile application that
              enables passengers to book seats on a bus using their smartphone.
              With a bus seat booking app, passengers can select their preferred
              seats, view bus schedules and routes, and make payments securely
              online.
            </Text>
            <View style={styles.butcontainer}>
              <TouchableOpacity style={styles.button}>
                <Image
                  source={rightarrow}
                  fadeDuration={0}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Image
                  source={maps}
                  fadeDuration={0}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Image
                  source={rightarrow}
                  fadeDuration={0}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.box2}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingBottom: 40,
            }}
          >
            {/* button */}
            <TouchableOpacity onPress={handleNext}>
              <View style={styles.btn}>
                <Text style={{ color: "white", fontSize: 18 }}>Book Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>

    // <View style={styles.container}>
    //   <Text style={styles.title}>{bus.busNumber}</Text>
    //   <Text style={styles.text}>Start time: {bus.startTime}</Text>
    //   <Text style={styles.text}>Arrival time: {bus.arriveTime}</Text>
    //   <Text style={styles.text}>Price: {bus.price}</Text>
    //   <Text style={styles.text}>Other specific details: {bus.otherDetails}</Text>
    //   <TouchableOpacity style={styles.button} onPress={handleNext}>
    //     <Text style={styles.buttonText}>Next</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    // height: "5%",
    // backgroundColor: "#c8c8c8",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  titleContainer1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  originText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  destinationText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  boxContainer: {
    width: "100%",
    // backgroundColor: "red",
    height: "90%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "100%",
    height: "25%",
    marginBottom: 10,
    marginTop: 5,
    padding: 5,
    // backgroundColor: "#4b80ce",
    borderRadius: 10,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
  },
  box1: {
    width: "100%",
    height: "50%",
    margin: 1,
    padding: 5,
    // backgroundColor: "#4b80ce",
    borderRadius: 10,
  },
  innerContainer1: {
    flex: 1,
    // backgroundColor: "white",
    // justifyContent: "center",
    flexDirection: "column",
    padding: 15,
    borderRadius: 5,
  },
  priceText: {
    // Added to occupy 1/3 of the available space
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  dateText: {
    // Added to occupy 1/3 of the available space
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  busnoText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  descriptionText: {
    flex: 1,
    fontSize: 15,
    alignSelf: "center",
  },
  box2: {
    width: "100%",
    height: "20%",
    margin: 1,
    padding: 5,
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: "#270e8e",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  butcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // backgroundColor: "blue",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 10,
  //   backgroundColor: "#fff",
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  // },
  // text: {
  //   fontSize: 18,
  //   marginBottom: 10,
  // },
  // button: {
  //   backgroundColor: "#007AFF",
  //   padding: 10,
  //   borderRadius: 5,
  //   marginTop: 20,
  // },
  // buttonText: {
  //   fontSize: 18,
  //   color: "#fff",
  //   textAlign: "center",
  // },
});

export default DetailsScreen;
