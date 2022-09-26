import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../../AppContext';
import {app, db} from '../../firebase/config';
import {getAuth} from 'firebase/auth';
import {getDoc, doc, GeoPoint} from 'firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStartedScreen from './GetStartedScreen';
import PersonalDetailsScreen from './PersonalDetailsScreen';
import CurrentFitnessScreen from './CurrentFitnessScreen';
import TargetFitnessScreen from './TargetFitnessScreen';
import {InitUserContext} from './InitNavigatorContext';

const InitStack = createNativeStackNavigator();

export default function InitNavigator({navigation}) {
  // check if userData exists in firebase
  const {userData, setUserData} = useContext(UserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      const firebaseUserData = await getDoc(
        doc(db, 'users', getAuth(app).currentUser.uid),
      );
      if (firebaseUserData.data()) {
        setUserData(firebaseUserData.data());
        navigation.navigate('MainNavigator');
      }
    };
    fetchUserData().catch(console.error);
  }, []);

  // else let user init their data
  const [initUserData, setInitUserData] = useState({
    birthdate: new Date('2000-01-01T00:00:00'),
    residentialAddress: new GeoPoint(1.35433, 103.68803),
    currentAbilities: {pushUpCount: 0, sitUpCount: 0, runTimeInSeconds: 0},
    targetAbilities: {pushUpCount: 0, sitUpCount: 0, runTimeInSeconds: 0},
  });
  const initUserDataValue = {initUserData, setInitUserData};

  return (
    <InitUserContext.Provider value={initUserDataValue}>
      <InitStack.Navigator
        initialRouteName="GetStarted"
        screenOptions={{
          headerShown: false,
        }}>
        <InitStack.Screen
          name="GetStartedScreen____"
          component={GetStartedScreen}
        />
        <InitStack.Screen
          name="PersonalDetailsScreen"
          component={PersonalDetailsScreen}
        />
        <InitStack.Screen
          name="CurrentFitnessScreen"
          component={CurrentFitnessScreen}
        />
        <InitStack.Screen
          name="TargetFitnessScreen"
          component={TargetFitnessScreen}
        />
      </InitStack.Navigator>
    </InitUserContext.Provider>
  );
}
