import React, {useState} from 'react';
import {auth} from './src/firebase/config';
import {UserContext} from './AppContext';

// import {GeoPoint} from 'firebase/firestore';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import InitNavigator from './src/screens/init/InitNavigator';
import MainNavigator from './src/screens/main/MainNavigator';
import {CustomStatusBar} from './src/components/CustomStatusBar';

const Stack = createNativeStackNavigator();

const App = () => {
  // check if user logged in already
  var onStart;
  auth.onAuthStateChanged(user => {
    if (user) {
      onStart = 'AuthScreen';
    } else {
      onStart = 'InitNavigator';
    }
  });
  const [userData, setUserData] = useState({});
  const userDataValue = {userData, setUserData};

  return (
    <UserContext.Provider value={userDataValue}>
      <NavigationContainer>
        <CustomStatusBar />
        <Stack.Navigator
          initialRouteName={onStart}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="InitNavigator" component={InitNavigator} />
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};
export default App;
