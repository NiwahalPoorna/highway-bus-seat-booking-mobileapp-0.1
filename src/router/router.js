import { Provider } from 'react-redux';

import store from "../store"



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/LoginScreen';
import SearchScreen from '../components/SearchScreen';
import DetailsScreen2  from '../components/DetailsScreen2';

import SeatSelectScreen from '../components/SeatSelectScreen';

import ConfirmScreen1 from '../components/ConfirmScreen1';
import { StripeProvider } from '@stripe/stripe-react-native';

// import CheckScreen from "../components/CheckScreen";
const Stack = createNativeStackNavigator();

const AppRouter = () => {
  return (
    <Provider store={store}>

    <NavigationContainer>
    <StripeProvider publishableKey="pk_test_51N060eAtNgtPyk47I8mfm21l1NTPQ7N9eFS4x2Hx2syhpDfzrsoxCaxeGiQakYZhpi2NXWJRImZy9Y9TMHbM70FR00h4TINxl7">
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen2} />
       
        <Stack.Screen name="SeatSelect" component={SeatSelectScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen1} />

           {/* <Stack.Screen name="Checkout" component={CheckScreen} /> */}

        {/* <Stack.Screen name="Signup" component={LoginScreen} /> */}
      
       
        
              </Stack.Navigator>
      </StripeProvider>
    </NavigationContainer>
    </Provider>
  );
}

export default AppRouter;
