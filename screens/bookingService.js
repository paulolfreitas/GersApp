import { Text, View } from "react-native";
import * as React from 'react';
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles/appStyles";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import bookService from "../utilities/bookService";
import { Alert } from "react-native";
import { Platform } from "react-native";
import DatePicker from "react-native-neat-date-picker";
import RNPickerSelect from "react-native-picker-select";


export default function BookingService() {
// defining all the const we need to save the information entered by the user.
    const [serviceType, setServiceType] = useState(null)
    const [vehicle_type, setVehicle_type] = useState(null)
    const [otherType, setOtherType] = useState(null)
    const [errorOtherType, setErrorOtherType] = useState(null)
    const [license, setLicense] = useState(null)
    const [enginee_type, setEnginee_type] = useState(null)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [errorServiceType, setErrorServiceType] = useState(null)
    const [errorVehicle_type, setErrorVehicle_type] = useState(null)
    const [errorLicense, setErrorLicense] = useState(null)
    const [errorEnginee_type, setErrorEngine_type] = useState(null)
    const [errorDate, setErrorDate] = useState(null)
    const [errorTime, setErrorTime] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    //these two const is to open and close the calendar.
    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const onCancel = () => {

        setShowDatePicker(false);
    };

    // on confirm the system will save the date to send to the db
    const onConfirm = (date) => {
        var weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        if(weekDay[date.getDay()]=='Sunday'){ // the method to not allow booking for sundays.
            Alert.alert('Plase slect other date.', 'Our garage is closed on Sunday!')
        }else{
        setShowDatePicker(false);
        console.log(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
        setDate(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
        setErrorDate(null);
    }};
    const onTime = (time) => {

        setShowTimePicker(false);
        setTime(time);
        setErrorTime(null);
    };

    const typeService = (serviceType) => {

        setShowTimePicker(false);
        console.log(serviceType);
        setServiceType(serviceType);
        setErrorServiceType(null);
    };

    const typeEnginee = (enginee_type) => {

        setShowTimePicker(false);
        console.log(enginee_type);
        setEnginee_type(enginee_type);
        setErrorEngine_type(null);
    };

 // this cosnt will set the vehicle_type, or other depends on what the user will choose.
    const typeVehicle = (vehicle_type) => {
       if (vehicle_type == "Other") {
        setShowTimePicker(false);
        setOtherType(vehicle_type);
        setErrorVehicle_type(null);
       } else {
           setShowTimePicker(false);
        setVehicle_type(vehicle_type);
        setErrorOtherType(null);
       }
        
    };


    const checkData = () => {
        let error = false
        setErrorServiceType(null)
        
        setErrorEngine_type(null)
        setErrorLicense(null)

        if (serviceType == null) {
            setErrorServiceType("Please enter the service")
            error = true
        }
      
        if (enginee_type == null) {
            setErrorEngine_type("Please enter the enginee type")
            error = true
        }
        if (license == null) {
            setErrorLicense("Please enter the license")
            error = true
        }
        return !error
    }

    const register = () => {
        if (checkData()) {
            setLoading(true)
// data that will be send to the back-end
            let data = {
                serviceType: serviceType,
                vehicle_type: vehicle_type,
                license: license,
                enginee_type: enginee_type,
                date: date,
                time: time,
                addCost: "Not available",
                status: "Booked",
                cost:"Not available",
                mechanic:"Not available",
                
            }
            console.log(data)

            bookService.register(data)
                .then((response) => {
                    setLoading(false)
                    Alert.alert(response.data.message)
                  
                })
                .catch((error) => {
                    setLoading(false)
                    Alert.alert("Error in the register, try again")
                    console.log(error)
                })
        }
    }

    var day = new Date();
    day.setDate(day.getDate() - 1);

    const sunday = new Date();
    sunday.setDate(sunday.getDay(0))


    // creating this function to return different times depends on which service the user wants to book.
    function chooseTime(){
        if (serviceType == "Major Repair" || serviceType == "Major Service" ) {
            return(
            <RNPickerSelect style={styles.maskedInput} 
            placeholder={{ label: "Select the time", value: null }}
            onValueChange={onTime}
            items={[
                { label: "10:00am", value: "10:00am" }, // 3 cars per slot
                { label: "1:00pm", value: "1:00pm" },
                { label: "3:00pm", value: "3:00pm" },
            ]}
        />)
        } else {
            return (
            <RNPickerSelect style={styles.maskedInput} 
            placeholder={{ label: "Select the time", value: null }}
            onValueChange={onTime}
            items={[
                { label: "09:00am", value: "9:00am" }, // 3     cars per slot
                { label: "11:00am", value: "11:00am" },
                { label: "2:00pm", value: "2:00pm" },
                { label: "4:00pm", value: "4:00pm" },
                
            ]}
        />)
        }
    }


    // creating a function to show a input when the user wants to input other vehicle
    function otherVehicle(){ 
        // I have a variable otherType, in case the otherType is other I the app will show a input to the user, where it will be set in vehicle_type
        if (otherType == "Other" ) {
            return(
                <Input
                placeholder="Vehicle"
                leftIcon={{type: "font-awesome", name:"list", size: 30,  color: 'orange'}}
                onChangeText={value => {
                    setVehicle_type(value)
                    setErrorVehicle_type(null)
                }}
                errorMessage={errorVehicle_type}
            />)
        }
    }


     

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}

            keyboardVerticalOffset={80}>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Book your appointment</Text>
              

                <Text style={styles.maskedInput}>Vehicle : </Text>
                    <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    {/* list with 30 differents cars and other option */}
                    <RNPickerSelect style={styles.maskedInput}
                        placeholder={{ label: "Select vehicle Type", value: null}}
                        onValueChange={typeVehicle}
                        items={[
                            { label: "BMW R1200", value: "BMW R1200" }, // 4 cars per slot
                            { label: "Citroen Berlingo", value: "Citroen Berlingo" },
                            { label: "Citroen SpaceTourer", value: "Citroen SpaceTourer" },
                            { label: "Ford Focus", value: "Ford Focus" },
                            { label: "Ford Tourneo Custom", value: "Ford Tourneo Custom" },
                            { label: "Ford Transit Connect", value: "Ford Transit Connect" },
                            { label: "Ford Transit Custom", value: "Ford Transit Custom" },
                            { label: "Ford Transit", value: "Ford Transit" },
                            { label: "Honda CBF125M", value: "Honda CBF125M" },
                            { label: "Hyundai Kona", value: "Hyundai Kona" },
                            { label: "Hyundai Tucson", value: "Hyundai Tucson" },
                            { label: "Mercedes Vito Tourer", value: "Mercedes Vito Tourer" },
                            { label: "Mercedes-Benz Sprinter", value: "Mercedes-Benz Sprinter" },
                            { label: "Nissan Qashaqai", value: "Nissan Qashaqai" },
                            { label: "Peugeot Partner", value: "Peugeot Partner" },
                            { label: "Peugeot Traveller", value: "Peugeot Traveller" },
                            { label: "Piaggio Vespa", value: "Piaggio Vespa" },
                            { label: "Renault Trafic Passenger", value: "Renault Trafic Passenger" },
                            { label: "Skoda Octavia", value: "Skoda Octavia" },
                            { label: "Suzuki GSF600", value: "Suzuki GSF600" },
                            { label: "Toyota C-HR", value: "Toyota C-HR" },
                            { label: "Toyota Corolla", value: "Toyota Corolla" },
                            { label: "Toyota Proace Verso", value: "Toyota Proace Verso" },
                            { label: "Toyota Yaris", value: "Toyota Yaris" },
                            { label: "Triumph Bonneville", value: "Triumph Bonneville" },
                            { label: "Triumph Tiger", value: "Triumph Tiger" },
                            { label: "Vauxhall Vivaro Life", value: "Vauxhall Vivaro Life" },
                            { label: "Vauxhall Vivaro", value: "Vauxhall Vivaro" },
                            { label: "Volkswagen Golf", value: "Volkswagen Golf" },
                            { label: "Volkswagen Tiguan", value: "Volkswagen Tiguan" },
                            { label: "Volkswagen Transporter Shuttle", value: "Volkswagen Transporter Shuttle" },
                            { label: "Yamaha YBR125", value: "Yamaha YBR125" },
                            { label: "Yamaha YZF-R1", value: "Yamaha YZF-R1" },
                            { label: "Other", value: "Other" },
                        ]}
                    />
                </View>

                <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    {otherVehicle()}
                    
                    </View>
                <Input
                    placeholder="License"
                    leftIcon={{type: "font-awesome", name:"list", size: 30,  color: 'orange'}}
                    onChangeText={value => {
                        setLicense(value)
                        setErrorLicense(null)
                    }}
                    errorMessage={errorLicense}
                />

                

                {/* The app will show 4 option of enginee */}
                        <Text style={styles.maskedInput}>Engine Type: </Text>
                    <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    <RNPickerSelect style={styles.maskedInput}
                        placeholder={{ label: "Select Engine Type", value: null}}
                        onValueChange={typeEnginee}
                        items={[
                            { label: "Diesel", value: "Diesel" }, 
                            { label: "Petrol", value: "Petrol" },
                            { label: "Electric", value: "Electric" },
                            { label: "Hybrid", value: "Hybrid" },
                        ]}
                    />
                </View>
               
                    <Text style={styles.maskedInput}>Type of Service: </Text>
                    <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    <RNPickerSelect style={styles.maskedInput}
                        placeholder={{ label: "Select service Type", value: null}}
                        onValueChange={typeService}
                        items={[
                            { label: "Annual Service", value: "Annual Service" }, // 4 cars per slot
                            { label: "Major Service", value: "Major Service" },
                            { label: "Repair", value: "Repair" },
                            { label: "Major Repair", value: "Major Repair" },
                        ]}
                    />
                </View>
                {/* using a button to open the calendar and the user will be able to select a date */}
                <Button
                    icon={<Icon name="calendar" size={15} color="white" />}
                    // buttonStyle={specificStyle.button}
                    title={" Date"}
                    onPress={openDatePicker}
                />
                <DatePicker
                    isVisible={showDatePicker}
                    mode={"single"}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                    minDate={day}
                    format="YYYY-MM-DD"
                    restrictedDates={sunday}
                   
                
                />
             
                    <Text style={styles.maskedInput}>Time of appointment: </Text>
                    <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    {chooseTime()}
                    
                    </View>

                {isLoading &&
                    <Text>Loading...</Text>
                }

                {!isLoading &&
                    <>
                        <Button
                            icon={
                                <Icon
                                    name="check"
                                    size={15}
                                    color="white"
                                />
                            }
                            title=" Register"
                            buttonStyle={styles.button}
                            onPress={() => register()} // calling the function register
                        />
                    
                    </>
                }

            </ScrollView>
        </KeyboardAvoidingView>
    )
}