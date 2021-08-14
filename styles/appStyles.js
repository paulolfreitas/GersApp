import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    button: {
        width: "100%",
        marginTop:10,
    },
    specificContainer: {
        backgroundColor: "#ffffff",
        padding: 10
    },
    container: {
        backgroundColor: "#ffffff",

    },
    cancelButton:{
        backgroundColor: "#c00",
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
    containerMask: {
        flexDirection: "row",
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    },
    text:{
        fontSize: 30,
        alignSelf: "center",
        color: 'blue',
        marginBottom: 20,
        marginTop: 20,
    },
    input:{
      //flex: 1,
     justifyContent: 'flex-end',
    //alignItems: 'flex-end',
    }, 
    inputContainer:{
        flexDirection: 'row',
      } 
}



);
export default styles;