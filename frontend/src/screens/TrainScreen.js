import React from 'react';
import {Text, View, Button, Pressable, Image} from 'react-native';
import * as globalStyles from '../css/globals.css';
import * as styles from '../css/TrainScreen.module.css';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TrainStack = createNativeStackNavigator();

function Selections({navigation}) {
  return (
    <><View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Training</Text>
    </View>
    <View style={styles.headerContainer}>
        <Text style={styles.header}>Select Training Programme</Text>
    </View>
    <View style={styles.contentContainer}>
      {/* Pushup button */}
        <Pressable style={({pressed}) => [pressed ? {...styles.button, opacity: 0.5} : styles.button]} 
          hitSlop={20} onPress={() => {
          navigation.navigate('PushUps')
        }}>
          <Image style={styles.buttonImage} source={require('../assets/Images/pushup_img.png')}/>
          <Text style={{...styles.buttonText, order: 0}}>Push ups</Text>
        </Pressable>

      {/* Sit-up button */}
        <Pressable style={({pressed}) => [pressed ? {...styles.button, opacity: 0.5} : styles.button]} 
        hitSlop={20} onPress={() => {
            navigation.navigate('SitUps')
        }}>
            <Image style={styles.buttonImage} source={require('../assets/Images/sit-ups.png')}/>
            <Text style={{...styles.buttonText, order: 1}}>Sit-ups</Text>
        </Pressable>

      {/* Run button */}
        <Pressable style={({pressed}) => [pressed ? {...styles.button, opacity: 0.5} : styles.button]} 
        hitSlop={20} onPress={() => {
            navigation.navigate('Run')
        }}>          
            <Image style={styles.buttonImage} source={require('../assets/Images/run.png')}/>
            <Text style={{...styles.buttonText, order: 2}}>2.4km run</Text>
        </Pressable>
      </View></>
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
