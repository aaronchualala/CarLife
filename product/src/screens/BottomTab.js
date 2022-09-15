import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlanScreen from './PlanScreen';
import SocialScreen from './SocialScreen';
import TrainScreen from './TrainScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Plan"
      // sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        // tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Social" component={SocialScreen} />
      <Tab.Screen name="Train" component={TrainScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
