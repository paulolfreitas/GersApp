import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// I decided to create a page with the booking connection to the back-end


class BookService{

    // register will send the data of the booking to register an appoitment 
    async register(data){
        let token = await AsyncStorage.getItem("TOKEN") // calling the token to add in the uthorization
        return axios(   
            {
                url: ('http://localhost:3000/booking/register'),// sending the variable in the url according to the one in eclipse.
                method: "POST",
                timeout: 5000,
                data: data,
                headers: {
                    Accept: 'application/jason',
                    Authorization: 'Bearer ' + token
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }

    //viewall will request the list of booking that was made 
    async viewAll(){
        let token = await AsyncStorage.getItem("TOKEN") // calling the token to add in the uthorization
        return axios(   
            {
                url: ('http://localhost:3000/booking/viewAll'),// sending the variable in the url according to the one in eclipse.
                method: "GET",
                timeout: 5000,
              
                headers: {
                    Accept: 'application/jason',
                    Authorization: 'Bearer ' + token
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }

    // customer will get all the bookings with their id.
    async view(){
        let token = await AsyncStorage.getItem("TOKEN") // calling the token to add in the uthorization
        return axios(   
            {
                url: ('http://localhost:3000/booking/viewBooking'),// sending the variable in the url according to the one in eclipse.
                method: "GET",
                timeout: 5000,
                headers: {
                    Accept: 'application/jason',
                    Authorization: 'Bearer ' + token
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }
    // update will send the data to update a booking that was alredy made.
    async updateBooking(data){
        let token = await AsyncStorage.getItem("TOKEN") // calling the token to add in the uthorization
        return axios(   
            {
                url: ('http://localhost:3000/booking/updateBooking'),// sending the variable in the url according to the one in eclipse.
                method: "POST",
                timeout: 5000,
                data: data,
                headers: {
                    Accept: 'application/jason',
                    Authorization: 'Bearer ' + token
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }
    // getting the list of booking that was completed on the db.
    async payment(){
        let token = await AsyncStorage.getItem("TOKEN") // calling the token to add in the uthorization
        return axios(   
            {
                url: ('http://localhost:3000/booking/payment'),// sending the variable in the url according to the one in eclipse.
                method: "GET",
                timeout: 5000,
                headers: {
                    Accept: 'application/jason',
                    Authorization: 'Bearer ' + token
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }
}

const bookService = new BookService();
export default bookService;