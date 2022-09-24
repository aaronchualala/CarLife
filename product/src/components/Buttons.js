import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as globalStyles from '../css/globals.css';


export function OrangeButton(props) {
    return (
        <TouchableOpacity 
            onPress={props.onPress} 
            style={styles.appButtonContainer} 
            activeOpacity={0.8}
        >
            <Text style={styles.appButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#FCBF49",
        borderRadius: 15,
        padding: 4,
        height: 40,
        width: 278
    },
    appButtonText: {
        fontSize: 24,
        color: "#EDF2F4",
        fontWeight: "normal",
        alignSelf: "center",
        textAlignVertical: "center",
    }
});