import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
LogBox.ignoreLogs([""]);
import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitScreen from './src/screens/InitScreen';
import BottomTab from './src/screens/BottomTab';
import {CustomStatusBar} from './src/components/CustomStatusBar';
const Stack = createNativeStackNavigator();
import AppContext from './src/components/AppContext';

export default function App() {
  var openScreen = 'BottomTab';
  const userInitData = {
    username: "",
    password: "",
    name: "",
    birthdate: 0,
    residentialAddress: "",
    currentAbilities: {
        pushUpCount: 0,
        sitUpCount: 0,
        runTimeInSeconds: 0
    },
    targetAbilities: {
        pushUpCount: 0,
        sitUpCount: 0,
        runTimeInSeconds: 0,
    },
    IPPTPrevGrade: ""
  }
  const [user, setUser] = useState(userInitData);
  return (
    <AppContext.Provider value={{user, setUser}}>
    <NavigationContainer>
      <CustomStatusBar />
      <Stack.Navigator
        initialRouteName={openScreen}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Init" component={InitScreen} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
