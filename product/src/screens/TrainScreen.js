import React from 'react';
import {Text, View, Button} from 'react-native';
import * as styles from '../css/TrainScreen.module.css';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TrainStack = createNativeStackNavigator();

function Selections({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Selections</Text>
      <Button
        title="Pushups"
        onPress={() => {
          navigation.navigate('PushUps');
        }}
      />
      <Button
        title="Situps"
        onPress={() => {
          navigation.navigate('SitUps');
        }}
      />
      <Button
        title="Run"
        onPress={() => {
          navigation.navigate('Run');
        }}
      />
    </View>
  );
}

function PushUps({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Pushups</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate('Selections');
        }}
      />
    </View>
  );
}

function SitUps({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>SitUps</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate('Selections');
        }}
      />
    </View>
  );
}

function Run({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Run</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate('Selections');
        }}
      />
    </View>
  );
}

export default function TrainScreen(props) {
  return (
    <TrainStack.Navigator
      initialRouteName="Selections"
      screenOptions={{
        headerShown: false,
      }}>
      <TrainStack.Screen name="Selections" component={Selections} />
      <TrainStack.Screen name="PushUps" component={PushUps} />
      <TrainStack.Screen name="SitUps" component={SitUps} />
      <TrainStack.Screen name="Run" component={Run} />
    </TrainStack.Navigator>
  );
}
