import {Text,View} from "react-native";
import * as React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/appStyles';
// this screen just cotain the button to call the screen to book an appointment. 
export default function Booking({navigation}){

    function bookingService(){
        navigation.navigate("BookingService")
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello, Please make you next appointment!</Text>

            <Button
            icon={
              <Icon
                name="car"
                size={20}
                color="white"
              />
            }
            title=" Booking Service"
            style={styles.button}
            onPress={() => bookingService()}
          />
    
        </View>
    )
}