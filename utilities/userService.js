import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// I decided to create one page to each service that I need to conect to the back-end 


class UserService{

    async signup(data){
        return axios(
            {
                url: ('http://localhost:3000/users/register'),// sending the variable in the url according to the one in eclipse.
                method: "POST",
                timeout: 5000,
                data: data,
                headers: {
                    Accept: 'application/jason'
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }


    async login(data){
        return axios(
            {
                url: ('http://localhost:3000/users/login'),// sending the variable in the url according to the one in eclipse.
                method: "POST",
                timeout: 5000,
                data: data,
                headers: {
                    Accept: 'application/jason'
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                AsyncStorage.setItem("TOKEN", response.data.access_token)
                AsyncStorage.setItem("USER", response.data.user)//saving the user
                AsyncStorage.setItem("PHONE", response.data.phone) 
                console.log(response.data)
                return Promise.resolve(response)     
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }

    async loginToken(data){
        return axios(
            {
                url: ('http://localhost:3000/users/loginToken'),// sending the variable in the url according to the one in eclipse.
                method: "POST",
                timeout: 5000,
                data: data,
                headers: {
                    Accept: 'application/jason'
                }
 //next will have a positive reponse or not
            }) .then((response) => {
                if(response.data.access_token){
                AsyncStorage.setItem("TOKEN", response.data.access_token)
                return Promise.resolve(response)
                }else{
                    return Promise.reject(response)
                }
            }).catch((error) => {
                return Promise.reject(error)
            })    
    }
}

const userService = new UserService();
export default userService;