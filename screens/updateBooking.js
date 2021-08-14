import bookService from "../utilities/bookService";
import { Alert, Text, View } from "react-native";
import * as React from 'react';
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles/appStyles";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectMultiple from 'react-native-select-multiple'
import RNPickerSelect from "react-native-picker-select";

import { Platform } from "react-native";

//creating the update page where just the admin will be able to acess

export default function UpdateBooking() {
    const [id, setId] = useState()
    const [cost, setCost] = useState(null)
    const [status, setStatus] = useState(null)
    const [errorStatus, setErrorStatus] = useState(null)
    const [addCost, setAddCost] = useState(null)
    const [errorAddCost, setErrorAddCost] = useState(null)
    const [mechanic, setMechanic] = useState(null)
    const [errorMechanic, setErrorMechanic] = useState(null)
    //data that the function will send to the back-end
    let data = {
        id: id,
        cost: cost,
        status: status,
        addCost: JSON.stringify(addCost, ['label']), // to add just the label of the item to our db
        mechanic: JSON.stringify(mechanic, ['label']),// to add just the label of the item to our db
    }

// const with 40 item to be shown to the admin
    const items = [
        { label: 'A.B.S. SL 6208 Brake Hose - €5,79', value: 'A.B.S. SL 6208 Brake Hose - €5,79' },
        { label: 'AKS DASIS 045137N EGR Valve - €54,02 ', value: 'AKS DASIS 045137N EGR Valve - €54,02 ' },
        { label: 'BLIC 1021-10-012021P Battery Holder - €27,60', value: 'BLIC 1021-10-012021P Battery Holder - €27,60' },
        { label: 'BLIC 6504-04-0026311P Wing - €34,98', value: 'BLIC 6504-04-0026311P Wing - €34,98' },
        { label: 'BLIC 6504-04-0026312P Wing - €38,57', value: 'BLIC 6504-04-0026312P Wing - €38,57' },
        { label: 'BLUE PRINT - ADG030238 - CLUTCH KIT (CLUTCH) - €241.18', value: 'BLUE PRINT - ADG030238 - CLUTCH KIT (CLUTCH) - €241.18' },
        { label: 'BOSCH 3 397 118 929 Wiper Blade - €19,61', value: 'BOSCH 3 397 118 929 Wiper Blade - €19,61' },
        { label: 'DAYCO APV3013 Belt Tensioner, v-ribbed belt - €156,41', value: 'DAYCO APV3013 Belt Tensioner, v-ribbed belt - €156,41' },
        { label: 'DELPHI SL10046-12B1 Valve, fuel supply system - €108,00', value: 'DELPHI SL10046-12B1 Valve, fuel supply system - €108,00' },
        { label: 'DT 4.66189 Wiper Blade - €42,46', value: 'DT 4.66189 Wiper Blade - €42,46' },
        { label: 'FEBI BILSTEIN 32941 Engine Oil - €8,33', value: 'FEBI BILSTEIN 32941 Engine Oil - €8,33' },
        { label: 'GB40 1000A NOCO Jump Starter - €119.00', value: 'GB40 1000A NOCO Jump Starter - €119.00' },
        { label: 'Halfords Metzen 15" Wheel Trim - Set of 4 - €39.60', value: 'Halfords Metzen 15" Wheel Trim - Set of 4 - €39.60' },
        { label: 'KAMOKA 27C03 Wiper Blade - €9,82', value: 'KAMOKA 27C03 Wiper Blade - €9,82' },
        { label: 'KROON OIL 33088 Engine Oil (Capacity: 5l) - €37,36', value: 'KROON OIL 33088 Engine Oil (Capacity: 5l) - €37,36' },
        { label: 'KROON OIL 33094 Engine Oil (Capacity: 1l) - €9,32', value: 'KROON OIL 33094 Engine Oil (Capacity: 1l) - €9,32' },
        { label: 'MAGNETI MARELLI 714027760801 Combination Rearlight - €42,07', value: 'MAGNETI MARELLI 714027760801 Combination Rearlight - €42,07' },
        { label: 'McGard Locking Wheel Bolts 27179SU - €44.40', value: 'McGard Locking Wheel Bolts 27179SU - €44.40' },
        { label: 'MEAT & DORIA 31435 Control, central locking - €34,34', value: 'MEAT & DORIA 31435 Control, central locking - €34,34' },
        { label: 'METZGER 0896013 Ballast, gas discharge lamp - €200,76', value: 'METZGER 0896013 Ballast, gas discharge lamp - €200,76' },
        { label: 'METZGER 0901213 Sensor, Xenon light - €94,14', value: 'METZGER 0901213 Sensor, Xenon light - €94,14' },
        { label: 'MEYLE 029 475 1900 Wiper Blade - €8,62', value: 'MEYLE 029 475 1900 Wiper Blade - €8,62' },
        { label: 'MOTUL 102773 Engine Oil - €9,24', value: 'MOTUL 102773 Engine Oil - €9,24' },
        { label: 'NOCO GB20 500A Jump Starter - €95.00', value: 'NOCO GB20 500A Jump Starter - €95.00' },
        { label: 'RIDEX 1145E0031 EGR Valve - €30,63', value: 'RIDEX 1145E0031 EGR Valve - €30,63' },
        { label: 'RIDEX 3721S0013 Sensor, Xenon light - €93,20', value: 'RIDEX 3721S0013 Sensor, Xenon light - €93,20' },
        { label: 'RIDEX 83B0528 Brake Hose - €10,27 ', value: 'RIDEX 83B0528 Brake Hose - €10,27' },
        { label: 'RIDEX Radiator fan with control unit - €247,49', value: 'RIDEX Radiator fan with control unit- €247,49' },
        { label: 'Ripspeed Alloy Wheel Fitting Kit 20 x Bolt 17mm 72.6/66.6 - €24.99', value: 'Ripspeed Alloy Wheel Fitting Kit 20 x Bolt 17mm 72.6/66.6 - €24.99' },
        { label: 'SHELL 550046275 Engine Oil - €7,72', value: 'SHELL 550046275 Engine Oil - €7,72' },
        { label: 'STARK SKPDS-1420021 Parking sensor - €34,07', value: 'STARK SKPDS-1420021 Parking sensor - €34,07' },
        { label: 'TOPRAN 115 155 Control, central locking system - €16,69', value: 'TOPRAN 115 155 Control, central locking system - €16,69' },
        { label: 'TRISCAN 8641 233024 Belt Tensioner, v-ribbed belt - €98,05', value: 'TRISCAN 8641 233024 Belt Tensioner, v-ribbed belt - €98,05' },
        { label: 'TRUCKTEC AUTOMOTIVE 02.19.199 Water Pump - €22,05', value: 'TRUCKTEC AUTOMOTIVE 02.19.199 Water Pump - €22,05' },
        { label: 'TYC 11-12074-11-2 Combination Rearlight - €57,88', value: 'TYC 11-12074-11-2 Combination Rearlight - €57,88' },
        { label: 'VAICO V30-50088 Water Pump - €30,23', value: 'VAICO V30-50088 Water Pump - €30,23' },
        { label: 'VALEO 890051 Parking sensor - €46,84', value: 'VALEO 890051 Parking sensor - €46,84' },
        { label: 'VAN WEZEL 0332655 Wing - €40,81', value: 'VAN WEZEL 0332655 Wing - €40,81' },
        { label: 'ZEKKERT LP-1064 Bulb, auxiliary stop light - €16,13', value: 'ZEKKERT LP-1064 Bulb, auxiliary stop light - €16,13' },
        { label: 'ZEKKERT LP-1143 Bulb, auxiliary stop light - €16,02', value: 'ZEKKERT LP-1143 Bulb, auxiliary stop light - €16,02' },

    ]

    const newItem = (addCost) => {

        console.log(addCost);
        setAddCost(addCost);
        setErrorAddCost(null);
    };
    const updateBooking = () => {
        //getting the reponse from the bookservice and storing into allBookings
        bookService.updateBooking(data)
 
            .then((response) => {
                Alert.alert("The booking was updated", "Please check view booking!");
       console.log(data)
            }).catch((error) => { 
                console.log(data)
                Alert.alert("Error", "Try Again!");
               
            });
    }

    const statusService = (status) => {

        
        setStatus(status);
        setErrorStatus(null);
    };
    const mechanicService = (status) => {
        setMechanic(status);
        setErrorMechanic(null);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}

            keyboardVerticalOffset={80}>
            <ScrollView style={styles.specificContainer}>
                <Text style={styles.text}>Update booking </Text>


                <Input
                    placeholder="ID"
                    leftIcon={{ type: "font-awesome", name: "car", size: 30, color: 'orange' }}
                    onChangeText={value => {
                        setId(value)
                        // setErrorLicense(null)
                    }}
                // errorMessage={errorLicense}
                />

                <Input
                    placeholder="Cost"
                    leftIcon={{ type: "font-awesome", name: "money", size: 30, color: 'orange' }}
                    onChangeText={value => {
                        setCost(value)
                
                    }}
                
                />
               
                   <Text style={styles.maskedInput}>Status: </Text>
                    <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    <RNPickerSelect style={styles.maskedInput}
                        placeholder={{ label: "Select service status", value: null}}
                        onValueChange={statusService}
                        items={[
                            { label: "In Service", value: "In Service" }, // 4 cars per slot
                            { label: "Completed", value: "Completed" },
                            { label: "Collected", value: "Collected" },
                            { label: "Unrepairable", value: "Unrepairable" },
                        ]}
                    />
                </View>
                <Text style={styles.maskedInput}>Mechanic: </Text>
                    <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    <RNPickerSelect style={styles.maskedInput}
                        placeholder={{ label: "Select Mechanic", value: null}}
                        onValueChange={mechanicService}
                        items={[
                            { label: "Brian", value: "Brian" }, // 4 cars per slot
                            { label: "Dean", value: "Dean" },
                            { label: "Ger", value: "Ger" },
                            { label: "John", value: "John" },
                            { label: "Mark", value: "Mark" },
                        ]}
                    />
                </View>
                  <Text style={styles.maskedInput}>Select extra items: </Text>
                    <View style={{ 
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    borderWidth: 1,
                    
                }} >
                    <SelectMultiple
                        items={items}
                        selectedItems={addCost}
                        onSelectionsChange={newItem} />
                </View>
                {/* this button call our function to request the information */}
                <Button
                    icon={<Icon name="check" size={15} color="white" />}
                    // buttonStyle={specificStyle.button}
                    title={"Update Bookings"}
                    onPress={() => updateBooking()}
                />
                {/* showing the information as a text on the screen */}
                {/* //<Text >{JSON.stringify(allBookings, null, ' ')}</Text> */}

            </ScrollView>
        </KeyboardAvoidingView>
    )

}