import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";

import Mybutton from "../components/MyButtons";
import userService from "../utilities/userService";



export default function login({ navigation }) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isLoadingToken, setLoadingToken] = useState(false);
       
    const signup = () => {
        navigation.navigate("SignUp")
      }
//creating a login user function to get the username and password that the user put in the placeholder
    const loginUser = () => {

        let data = {
            username: email,
            password: password,
        }

      
        userService.login(data) //call the loging service function to send the parameters.

        .then((response) => {
            setLoading(true)
            navigation.reset({
                index:0,
                routes: [{
                        name: 'HomeScreen',
                        params: {email: data.username, phone: response.data.phone, name: response.data.name}}]   
            })    
             
        })
        .catch((error) => {
            setLoading(false)
           // showDialog("Error", "Please try again", "ERROR")
            Alert.alert("User invalid, please try again!")
            console.log(error)
        })
    }
    //creating a new login to use token to login automatic in the app
    const loginToken = (token) => {

        setLoadingToken(true)
        let data = {
            token: token
        }

        userService.loginToken(data) //call the loging service function to send the parameters.

        .then((response) => {
            setLoadingToken(false) 
            navigation.reset({
                index:0,
                routes: [{name: "HomeScreen", params: {email: data.username}}]
            })    
        })
        .catch((error) => {
            setLoadingToken(false)
           
        })
    }
    //using useEffect to check if the user has a valid token to login in the app
    useEffect(() => {
        AsyncStorage.getItem("TOKEN").then((token) => {
           loginToken(token)
        })
    }, []) //using [] to stop useEffect of being calling without stopping

    return (
        <View style={styles.container}>
            <ScrollView>
             {!isLoadingToken &&
             <>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={60}
                >
                    <View style={styles.logoContainer}>
                        <Image source={require("../assets/logo.jpg")} style={styles.logo} />
                    </View>
                    {/* the next code is to get the information from the user and set the username and password */}
                    <StatusBar style="auto" />
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#000000"
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#000000"
                            secureTextEntry={true}
                            onChangeText={(value) => setPassword(value)}
                        />
                    </View>

                    {isLoading &&
                        <ActivityIndicator />
                    }

                    {!isLoading &&
                        <TouchableOpacity >
                            <Mybutton
                                title="Login"
                                customClick={loginUser} // calling the function
                            />
                        </TouchableOpacity>
                    }
          <Button
            icon={
              <Icon
                name="user"
                size={15}
                color="white"
              />
            }
            title=" Sign Up"
            onPress={() => signup()}
          />
                
                </KeyboardAvoidingView>
                </>
}
            </ScrollView>
    </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },

    image: {
        flexGrow: 1,
        width: '100%',
        marginBottom: 40,
        alignContent: "center",
        justifyContent: "center",


    },

    inputView: {
        backgroundColor: "#ffe4c4",
        borderRadius: 30,
        width: "100%",
        height: 35,
        marginBottom: 10,
        alignItems: "center",
    },

    TextInput: {
        height: 70,
        flex: 1,
        padding: 10,
        color: '#000000',

    },
    logoContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 350,
        height: 350,
        resizeMode: "contain"
    },


    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ffd700",
    },
})
