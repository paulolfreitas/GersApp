import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
//import { Button as PaperButton, Provider, Dialog, Paragraph, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDialog from '../components/CustomDialog';
import Mybutton from '../components/MyButtons';
import userService from '../utilities/userService';
// import styles from '../style/MainStyle';



export default function signup({ navigation }) {
 // creating the const where the information will be stored
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [password, setPassword] = useState(null)
    const [isSelected, setSelected] = useState(false)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorName, setErrorName] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [titulo, setTitulo] = useState(null)
    const [tipo, setTipo] = useState(null)
    const [message, setMessage] = useState(null)


    const showDialog = (titulo, message, tipo) => {
        setVisibleDialog(true)
        setTitulo(titulo)
        setMessage(message)
        setTipo(tipo)
    }

    const hideDialog = (status) => {
        setVisibleDialog(status)
    }
    // checking that the user enterd a valid value
    const checkData = () => {
        let error = false
        setErrorName(null)
        setErrorEmail(null)
        setErrorPassword(null)
        setErrorPhone(null)

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(email).toLowerCase())) {
            setErrorEmail("Please enter your email")
            error = true
        }
        if (name == null) {
            setErrorName("Please enter your name")
            error = true
        }

        if (password == null) {
            setErrorPassword("Please enter a password")
            error = true
        }
        if (phoneNumber == null) {
            setErrorPhone("Please enter your phone number")
            error = true
        }
        return !error
    }
// function that get the data and send to the userSevice to register the user.
    const register = () => {
        if (checkData()) {
            setLoading(true)

            let data = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            }
            console.log(data)

            userService.signup(data)
                .then((response) => {
                    setLoading(false)
                    const titulo = (response.data.status) ? "User Registered" : "Error"
                    showDialog(titulo, response.data.message, "SUCESSO")
                    //Alert.alert(titulo, response.data.mensagem)        
                })
                .catch((error) => {
                    setLoading(false)
                    showDialog("Error", "Please try again", "ERROR")
                    //Alert.alert("Erro", "Houve um erro inesperado")
                    console.log(error)
                })
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}

            keyboardVerticalOffset={80}>
            <ScrollView style={specificStyle.container}>
                <Text h3>User Register</Text>

                <View >
                    <Input
                        placeholder="Name"
                        onChangeText={value => setName(value)}
                        errorMessage={errorName}
                    />
                </View>
                <View >
                    <Input
                        placeholder="Email"
                        onChangeText={value => {
                            setEmail(value)
                            setErrorEmail(null)
                        }}
                        keyboardType="email-address"
                        errorMessage={errorEmail}
                    />
                </View>

                <View style={specificStyle.containerMask}>
                    <TextInputMask style={specificStyle.maskedInput}
                        placeholder="Phone Number"
                        type={"cel-phone"}
                        options={{
                            maskType: "INTERNATIONAL"
                        }}
                        value={phoneNumber}
                        onChangeText={value => {
                            setPhoneNumber(value)
                            setErrorPhone(null)
                        }}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                    //ref={(ref) => telefoneField = ref}

                    />
                </View>
                <Text>{errorPhone}</Text>
                <View >
                    <Input
                        placeholder="Password"
                        onChangeText={value => setPassword(value)}
                        errorMessage={errorPassword}
                        secureTextEntry={true}
                    />
                </View>
                


                {isLoading &&
                    <Text>Loading...</Text>
                }
                {/* calling the register function when the user click on the button register */}
                {!isLoading &&
                    <Mybutton
                        icon={
                            <Icon
                                name="check"
                                size={15}
                                color="white"
                            />
                        }
                        title="Register"
                        buttonStyle={specificStyle.button}
                        customClick={register}
                    />
                }
                {!isLoading &&
                    <Mybutton
                        title="Login"
                        //buttonStyle={specificStyle.button}
                        customClick={() => navigation.navigate("Login")}
                    />}
                <View style={specificStyle.logoContainer}>
                    <Image source={require("../assets/logo.jpg")} style={specificStyle.logo} />
                </View>
                {visibleDialog &&
                    <CustomDialog titulo={titulo} message={message} tipo={tipo} visible={visibleDialog} onClose={hideDialog}></CustomDialog>
                }

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const specificStyle = StyleSheet.create({
    specificContainer: {
        backgroundColor: "#ffffff",
        padding: 10
    },
    button: {
        width: "100%",
        marginTop: 10
    },
    container: {
        backgroundColor: "#ffffff",

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
        alignItems: 'flex-end',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain"
    },
    containerMask: {
        flexDirection: "row",
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    },
    maskedInput: {
        flexGrow: 1,
        height: 40,
        fontSize: 18,
        borderBottomColor: "#999",
        borderBottomWidth: 1,
        borderStyle: "solid",
        alignSelf: "flex-start"
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