import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import user from "../../assets/user.png";
import axios from "axios";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native"; 

import {BASE_URL} from "@env";

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const userDetails = useSelector((state) => state.userlog.user);
  const email = userDetails?.email;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.8.192:3000/user/details/${email}`
        );
        console.log(response.data);
        setProfileData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };
    if (email) {
      fetchProfileData();
    }
  }, [email]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading profile data...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      ) : (
        <>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image source={user} size={80} />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {profileData.fullName}
                </Title>
                <Caption style={styles.caption}>
                  @{profileData.fullName}
                </Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#6e6e6e", marginLeft: 20 }}>
                58 Prince Street, 11, Colombo
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                +94-768501634
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
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

          <View style={styles.menuWrapper}>
            <TouchableRipple
            // onPress={() => {}}
            >
              <View style={styles.menuItem}>
                <Icon name="heart-outline" color="#1f29ab" size={25} />
                <Text style={styles.menuItemText}>Your Favorites</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
            // onPress={() => {}}
            >
              <View style={styles.menuItem}>
                <Icon name="credit-card" color="#1f29ab" size={25} />
                <Text style={styles.menuItemText}>Payment</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
            // onPress={myCustomShare}
            >
              <View style={styles.menuItem}>
                <Icon name="share-outline" color="#1f29ab" size={25} />
                <Text style={styles.menuItemText}>Tell Your Friends</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => navigation.navigate("Support")}>
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#1f29ab" size={25} />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
            // onPress={() => {}}
            >
              <View style={styles.menuItem}>
                <Icon name="cog" color="#1f29ab" size={25} />

                <Text style={styles.menuItemText}>Settings</Text>
              </View>
            </TouchableRipple>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    color: "gray",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
export default ProfileScreen;
// <View style={styles.container}>
//   {isLoading ? (
//     <Text style={styles.loadingText}>Loading profile data...</Text>
//   ) : error ? (
//     <Text style={styles.errorText}>Error: {error.message}</Text>
//   ) : (
//     <>
//       <Text style={styles.title}>Profile data for {email}:</Text>
//       <Text style={styles.text}>Name: {profileData.fullName}</Text>
//     </>
//   )}
// </View>

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   loadingText: {
//     fontSize: 18,
//     color: "gray",
//   },
//   errorText: {
//     fontSize: 18,
//     color: "red",
//   },
// });

// export default ProfileScreen;
