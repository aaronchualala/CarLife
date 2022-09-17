import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitScreen from './src/screens/InitScreen';
import BottomTab from './src/screens/BottomTab';
import {CustomStatusBar} from './src/components/CustomStatusBar';
const Stack = createNativeStackNavigator();

const App = () => {
  var openScreen = 'BottomTab';
  return (
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
  );
};
export default App;
