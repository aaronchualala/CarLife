import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as globalStyles from '../css/globals.css';


export function OrangeButton(props) {
    return (
        <TouchableOpacity 
            onPress={props.onPress} 
            style={styles.orangeButtonContainer} 
            activeOpacity={0.8}
        >
            <Text style={styles.orangeButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    orangeButtonContainer: {
        elevation: 8,
        backgroundColor: "#FCBF49",
        borderRadius: 15,
        paddingTop: 6,
        height: 40,
        width: 278,
        opacity: 1.0
    },
    orangeButtonText: {
        fontSize: 24,
        color: "#EDF2F4",
        fontWeight: "normal",
        alignSelf: "center",
        textAlignVertical: "center",
        fontFamily: "Montserrat",
    }
});