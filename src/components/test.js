// import React, { useState } from "react";
// import {
//   Button,
//   View,
//   Text,
 
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { Card } from "react-native-elements";

// import axios from "axios";
// import { TextInput } from "react-native-paper";




// const Stack = createStackNavigator();






// const SearchScreen = ({ navigation }) => {
//   const [buses, setBuses] = useState([]);


  
  
//   const searchBuses = async (values) => {
//     console.log(value);
//     try {
//       const response = await axios.get(
        
//       );
//       setBuses(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

 
 
//   return (
//     <View >
//       <View >
        
//             <TextInput
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//               placeholder="Enter origin"
//               style={styles.textInput}
//             />
         
        
        
//         <Button
//           onPress={handleSubmit(searchBuses)}
//           title="Search"
//           style={styles.button}
//         />
//       </View>
//       <View >
//         <ScrollView >
//           {buses.map((bus) => (
//             <TouchableOpacity
//               key={bus._id}
//               onPress={() =>  navigation.navigate('Details', { bus })}
//             >
//               <Card title={bus.busNumber}>
//                 <Text>Start time: {bus.startTime}</Text>
//                 <Text>Arrival time: {bus.arriveTime}</Text>
                
//               </Card>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };


// export default SearchScreen;











// import { StyleSheet, Text, View } from "react-native";
// // import RegisterScreen from "./src/components/RegisterScreen"
//   // import LoginScreen from "./src/components/LoginScreen"
// // import SearchScreen from "./src/components/SearchScreen"
// // import DetailsScreen from "./src/components/DetailsScreen"
// // import { NavigationContainer } from '@react-navigation/native';
// // import StackNavigator from "./src/components/StackNavigator";


// // import LoginScreen from './src/components/LoginScreen';
// // import HomeScreen from './src/components/HomeScreen';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import LoginScreen from './src/components/LoginScreen';
// // import SearchScreen from './src/components/SearchScreen';

// // const Stack = createStackNavigator();

// import AppRouter from "./src/router/router";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <Text>hi</Text> */}
//       {/* <RegisterScreen/> */}
//       {/* <LoginScreen/> */}
//       {/* <SearchScreen/> */}
//       {/* <DetailsScreen/> */}
//       {/* <NavigationContainer>
//       <StackNavigator/>
//     </NavigationContainer> */}
//     {/* <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Search" component={SearchScreen} />
//         </Stack.Navigator>
//       </NavigationContainer> */}


//      <AppRouter/>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });