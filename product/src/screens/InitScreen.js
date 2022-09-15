import React from 'react';
import {View, Text, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as styles from '../css/InitScreen.module.css';

const InitStack = createNativeStackNavigator();

function GetStarted({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.demoClass}>Welcome</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('PersonalDetails')}
      />
    </View>
  );
}

function PersonalDetails({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>WHAT DO WE CALL YOU?</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate('CurrentFitness')}
      />
    </View>
  );
}

function CurrentFitness({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>current fitness</Text>
      <Button
        title="Back"
        onPress={() => navigation.navigate('PersonalDetails')}
      />
      <Button
        title="Next"
        onPress={() => navigation.navigate('TargetFitness')}
      />
    </View>
  );
}

function TargetFitness({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>target fitness</Text>
      <Button
        title="Back"
        onPress={() => navigation.navigate('CurrentFitness')}
      />
      <Button
        title="Let's Go!"
        onPress={() => navigation.navigate('LocationRecommender')}
      />
    </View>
  );
}

function LocationRecommender({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>recommend location</Text>
      <Button title="Next" onPress={() => navigation.navigate('BottomTab')} />
    </View>
  );
}

export default function InitScreen(props) {
  return (
    <InitStack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{
        headerShown: false,
      }}>
      <InitStack.Screen name="GetStarted" component={GetStarted} />
      <InitStack.Screen name="PersonalDetails" component={PersonalDetails} />
      <InitStack.Screen name="CurrentFitness" component={CurrentFitness} />
      <InitStack.Screen name="TargetFitness" component={TargetFitness} />
      <InitStack.Screen
        name="LocationRecommender"
        component={LocationRecommender}
      />
    </InitStack.Navigator>
  );
}
