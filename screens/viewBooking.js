import bookService from "../utilities/bookService";
import {Alert, Text,View} from "react-native";
import * as React from 'react';
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles/appStyles";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

import { Platform } from "react-native";


export default function ViewBookings(){


const [Bookings, setBookings] = useState(" ") //creating const to store the value we get from the server
const viewBookings = ()=> {
//getting the reponse from the bookservice and storing into allBookings
    bookService.view()
    .then((response) => {
        setBookings(response.data);
        Alert.alert("Success", "Showing all bookings.");

    }).catch((error) => {
        Alert.alert("Error", "Try Again!");
    });
}

return (
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}

        keyboardVerticalOffset={80}>
        <ScrollView style={styles.specificContainer}>
            <Text style={styles.text}>Your bookings</Text>
          
     
        
         {/* showing the information as a text on the screen */}
                <Text >{JSON.stringify(Bookings, ['vehicle_type','license', 'serviceType','date', 'time', 'status', 'mechanic'], ' ').replaceAll("status", "Status").replaceAll("mechanic", "Mechanic").replaceAll("serviceType", "Service").replaceAll("license", "License").replaceAll("vehicle_type", "Vehicle").replaceAll("{", " ").replaceAll("}", " ").replaceAll( '"' , " ").replaceAll( "[", " ").replaceAll( "]", " ").replaceAll( ",", " ").replaceAll(/\\/g, ' ').replaceAll("date", "Date").replaceAll("time", "Time") + "\n" + "\n"}</Text>
                   {/* this button call our function to request the information */}
            <Button
                icon={<Icon name="check" size={15} color="white" />}
                // buttonStyle={specificStyle.button}
                title={" Check All Bookings"}
                onPress={() => viewBookings()}
            />
        </ScrollView>
    </KeyboardAvoidingView>
)

}