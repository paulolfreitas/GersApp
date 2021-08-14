import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import login from './screens/login';
import signup from './screens/signup';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/homeScreen';
import ViewBooking from './screens/viewBooking';
import Payments from './screens/payments';
import Profile from './screens/profile';
import BookingService from './screens/bookingService';
import Booking from './screens/booking';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './utilities/config';
import ViewAllBookings from './screens/viewAllBookings';
import UpdateBooking from './screens/updateBooking';


// initialRouteName="Login"
const Stack = createStackNavigator();
// creating my stack with the pages, using initialroutename to define login as initial page.
function MyStack() {
  return (
    <Stack.Navigator > 
     <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} 
          options={ {  title: "Ger's Garage",
          headerStyle: {
            backgroundColor: "#f0e68c",
          },
          headerTintColor: "#483d8b",}} />

      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="BookingService" component={BookingService} />
      <Stack.Screen name="ViewBookings" component={ViewBooking} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SignUp" component={signup} />
      <Stack.Screen name="ViewAllBookings" component={ViewAllBookings} />
      <Stack.Screen name="UpdateBooking" component={UpdateBooking} />
    </Stack.Navigator>
  );
}

//creating the interceptor to refresh the token when the error is 401

function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if(err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) =>{
          let resp = axios.put(`${Config.API_URL}token/refresh`, {oldToken: token})
          .then((resp) => {
            AsyncStorage.setItem("TOKEN", resp.data.access_token)
            originalReq.headers["Authorization"] = `Bearer ${resp.data.access_token}`
            return axios(originalReq)
          })
          resolve(resp)
        })
      }else{
        reject(err)
      }
    })
  })
}

export default function App() {
  
  defineInterceptor() //we call that when the app starts

  return (

    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
