import {app, auth, db} from '../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, doc, setDoc} from 'firebase/firestore';
import React, {useState} from 'react';
import {View, Text, Button, TextInput, Pressable} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as styles from '../css/InitScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { ImageBackground, StyleSheet} from 'react-native';
import { Image } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';

const bgImage = require("product/src/assets/BackgroundImages/Greyscale.png");
const logo = require('product/src/assets/BackgroundImages/logo.png');
const InitStack = createNativeStackNavigator();
var InitData = {};

const style = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 0.9,
  },
});


function GetStarted({navigation}) {
  return (
    <View style={{flex: 1, justifyContent:'center'}}>
      <ImageBackground source ={bgImage}  style = {{height:'100%', width:'100%'}} blurRadius={8}>
        <Image source={logo} style={styles.logoClass}/>
        <Text style = {[styles.sloganClass, style.shadowProp]}>FITTER,{'\n'}TOGETHER</Text>
      <View style = {{alignSelf:'center'}}>
      <Pressable style = {styles.button}
        onPress={() => {
          navigation.navigate('Registration');
        }}>
        <Text style={styles.buttonText}>Get Started</Text>
       </Pressable>
      </View>
      </ImageBackground>
    </View>
  );
}

function Registration({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground source ={bgImage}  style = {{height:'100%', width:'100%'}} blurRadius={8}>
      <Image source={logo} style={styles.logoClass}/>
      <Text style={[styles.headerText, style.shadowProp]}>Registration</Text>
      <TextInput
        placeholder='Email'
        placeholderTextColor={"#808080"}
        style={globalStyles.textInputClass}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor={"#808080"}
        style={globalStyles.textInputClass}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Pressable style = {styles.nextButton} 
        onPress={() => {
          InitData = {...InitData, email: email, password: password};
          navigation.navigate('PersonalDetails');
        }}>
        <Text style={styles.nextText}>Next</Text>
        </Pressable>
        </ImageBackground>
      </View>
  );
}

function PersonalDetails({navigation}) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground source ={bgImage}  style = {{height:'100%', width:'100%'}} blurRadius={8}>
      <Image source={logo} style={styles.logoClass}/>
      <Text style ={[style.shadowProp,styles.requestText]}>What do we call you?</Text>
      <TextInput
        placeholder='Name'
        placeholderTextColor={"#808080"}
        style={globalStyles.textInputClass}
        onChangeText={text => setName(text)}
        value={name}
      />
      <Button
        title="Next"
        onPress={() => navigation.navigate('CurrentFitness')}
      />
    </ImageBackground>
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
