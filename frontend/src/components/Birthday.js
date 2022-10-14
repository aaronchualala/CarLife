import React, { Component } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View } from "react-native";

export default class Birthday extends Component {

    render(){
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <DateTimePicker
        mode = "date"
        display = "default"
        value ={new Date()} 
    />
    </View>
    }                               

}