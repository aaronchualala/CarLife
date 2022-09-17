import {app, auth, db} from '../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, doc, setDoc} from 'firebase/firestore';

import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as styles from '../css/InitScreen.module.css';
import * as globalStyles from '../css/globals.css';

const InitStack = createNativeStackNavigator();
var InitData = {};

function GetStarted({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.demoClass}>Welcome</Text>
      <Button
        title="Get Started"
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
    </View>
  );
}

function Registration({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.demoClass}>Registration</Text>
      <Text>Email</Text>
      <TextInput
        style={globalStyles.textInputClass}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        style={globalStyles.textInputClass}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button
        title="Next"
        onPress={() => {
          InitData = {...InitData, email: email, password: password};
          navigation.navigate('PersonalDetails');
        }}
      />
    </View>
  );
}

function PersonalDetails({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>What do we call you?</Text>
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
      <Button
        title="Next"
        onPress={() => {
          createUserWithEmailAndPassword(
            auth,
            InitData.email,
            InitData.password,
          )
            .then(() => {
              setDoc(doc(db, 'userInfo', auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                ...InitData,
              }).catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
              });
            })
            .then(() => {
              navigation.navigate('BottomTab');
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
            });
        }}
      />
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
      <InitStack.Screen name="Registration" component={Registration} />
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
