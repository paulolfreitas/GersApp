import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from './profile';
import Booking from './booking';
import ViewBooking from './viewBooking';
import Payments from './payments';
import ViewAllBookings from './viewAllBookings';
import UpdateBooking from './updateBooking';


const Tab = createBottomTabNavigator();

export default function HomeScreen({route, navigation}){

  // saving parameters to be send to the screen we need to use.
const email = route.params?.email;
const name = route.params?.name;
const phone = route.params?.phone;

console.log(JSON.stringify(email))

// I am getting the email from the login and checking here if the user is using this email below, if the email is the same the program returns the menu for ger.
  if (JSON.stringify(email) == '"Ger@gmail.com"' || JSON.stringify(email) == '"ger@gmail.com"' ){
  return (
    
    <Tab.Navigator
   // initialRouteName="View Booking"
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}
  >
   
    <Tab.Screen
      name="ViewAllBookings"
      component={ViewAllBookings}
      options={{
        tabBarLabel: 'View Bookings',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
        ),
      }}
    />
      <Tab.Screen
      name="Update"
      component={UpdateBooking}
      options={{
        tabBarLabel: 'Update Booking',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="folder-plus" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
}else{ //in any other case the menu will be the client one.
  return (   <Tab.Navigator
    initialRouteName="Booking"
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}
  >
    <Tab.Screen
      name="Booking"
      component={Booking}
      options={{
        tabBarLabel: 'Booking',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="car-cog" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="View Booking"
      component={ViewBooking}
      options={{
        tabBarLabel: 'My bookings',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Payments"
      component={Payments}
      initialParams={{userName: name, phone: phone}} //passing params
      options={{
        tabBarLabel: 'Payments',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cash" color={color} size={size} />
        ),
      }}
    />
   
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)   
 
}
}
