import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import styles from '../styles/appStyles';

//this page contins the log out function
export default function Profile({navigation}) {

    const logout = (navigation) => {
        AsyncStorage.setItem("TOKEN","").then(() => {
            navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
            })
        }).catch((error) => {
            console.log(error)
            Alert.alert("Please try again!")
        })
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
        <Button
            icon={
              <Icon
                name="power-off"
                size={20}
                color="white"
              />
            }
            title=" Logout"
            style = {styles.button}
            onPress={() => logout(navigation)}
          />
      </View>
    );
  }