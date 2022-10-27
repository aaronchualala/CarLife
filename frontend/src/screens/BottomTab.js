import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlanScreen from './PlanScreen';
import SocialScreen from './SocialScreen';
import TrainScreen from './TrainScreen';
import ProfileScreen from './ProfileScreen';
import {MaterialIcon} from '../assets/MaterialIcons';
import {Ionicon} from '../assets/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      // sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'grey',
        // tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcon size="extraLarge" color={color} name="today" />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcon size="extraLarge" color={color} name="people" />
          ),
        }}
      />
      <Tab.Screen
        name="Train"
        component={TrainScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcon
              size="extraLarge"
              color={color}
              name="fitness-center"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicon
              size="extraLarge"
              color={color}
              name="person-circle-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
