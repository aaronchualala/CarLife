// import {app, auth, db} from '../firebase/config';
// import {createUserWithEmailAndPassword} from 'firebase/auth';
// import {collection, doc, setDoc} from 'firebase/firestore';
import React, { useState, show, useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, Button, TextInput, Pressable, PlatformColor, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as styles from '../css/InitScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { ImageBackground, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { preventAutoHideAsync } from 'expo-splash-screen';

const bgImage = require('../assets/BackgroundImages/GreyscaleRunningMan.png');
const logo = require('../assets/BackgroundImages/FitBudsLogo.png');
const next = require('../assets/BackgroundImages/next.png')
const back = require('../assets/BackgroundImages/back.png')
const InitStack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();
var InitData = {};

const style = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 0.9,
  },
});

global.pushExemption = false;
global.sitExemption = false;
global.runExemption = false;

function GetStarted({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={3.5}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />
        <Text style={[styles.sloganClass, style.shadowProp]}>FITTER,{'\n'}TOGETHER</Text>
        <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
          <Pressable style={styles.button}
            onPress={() => {
              navigation.navigate('Registration');
            }}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
          <Pressable style={styles.button}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

function Login({ navigation }) {
  // var loginData = {};
  const [loginData, setLoginData] = useState({});
  const [pressed, setPressed] = useState(false);
  const toggle = () => setPressed(previousState => !previousState);
  const [dataReq, setDataReq] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [failed, setFailed] = useState(false);

  let initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current){
      initialRender.current = false;
    } else {
      loginUser(loginData);
    }
  }, [loginData])

  useEffect(() => {
    if (dataReq._id) {
      setFailed(false);
      setLoggedIn(true);
    }
    else if (dataReq.message === "User Not Found") {
      setFailed(true);
    }
  },[dataReq])
  async function loginUser(credentials) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    };
    fetch("http://52.77.246.182:3000/users", requestOptions)
      .then(response => response.json())
      .then(data => setDataReq(data))
  }

  function setLogin() {
    setLoginData({ username: username, password: password });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={8}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />
        <Text style={[styles.headerText, style.shadowProp]}>Login</Text>
        <TextInput
          placeholder='Username'
          placeholderTextColor={"#363535"}
          style={styles.textInputClass}
          textContentType='username'
          // keyboardType='email-address'
          // spellCheck='true'
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor={"#363535"}
          style={styles.textInputClass}
          textContentType='password'
          secureTextEntry='true'
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Pressable style={styles.loginButton}
          onPress={() => {
            setLogin();
          }}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        {loggedIn ?
          <Pressable style={styles.nextButton}
            onPress={() => {
              navigation.navigate('BottomTab');
            }}>
            <Text style={styles.nextText}>Next</Text>
          </Pressable> : null}
        {failed ? 
          <Text style={styles.failedText} >User does not exist</Text>:
          null
        }
      </ImageBackground>
    </View>
  )
}

function Registration({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={8}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />
        <Text style={[styles.headerText, style.shadowProp]}>Registration</Text>
        <TextInput
          placeholder='Email'
          placeholderTextColor={"#363535"}
          style={styles.textInputClass}
          textContentType='emailAddress'
          keyboardType='email-address'
          spellCheck='true'
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor={"#363535"}
          style={styles.textInputClass}
          textContentType='password'
          secureTextEntry='true'
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Pressable style={styles.nextButton}
          onPress={() => {
            InitData = { ...InitData, username: email, password: password };
            navigation.navigate('PersonalDetails');
          }}>
          <Text style={styles.nextText}>Next</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

function PersonalDetails({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS == 'ios');
    setDate(currentDate);
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={8}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />
        <Text style={[style.shadowProp, styles.requestText]}>What do we call you?</Text>
        <TextInput
          placeholder='Name'
          placeholderTextColor={"#808080"}
          style={styles.textInputClass}
          textContentType='name'
          onChangeText={text => setName(text)}
          value={name}
        />
        <View style={styles.datePadding}></View>
        <Text style={[style.shadowProp, styles.requestText]}>What is your address?</Text>
        <TextInput
          placeholder='Postal Code'
          placeholderTextColor={"#808080"}
          style={styles.textInputClass}
          keyboardType='number-pad'
          returnKeyType='done'
          maxLength={6}
          textContentType='postalCode'
          onChangeText={text => setAddress(text)}
          value={address}
        />
        <Text style={[style.shadowProp, styles.requestText]}>What is your date of birth?</Text>
        <View style={styles.datePadding}></View>

        {show && (
          <View style={styles.dateContainer}>
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              onChange={onChange}
            />
          </View>)}

        <Pressable style={styles.fitnessNextButton}
          onPress={() => {
            InitData = { ...InitData, name: name, residentialAddress: address, birthdate: date.getTime() };
            navigation.navigate('CurrentFitness');
          }}>
          <View style={styles.alignContainer}>
            <Text style={styles.fitnessNextText}>Next </Text>
            <Image source={next} style={styles.nextIcon}></Image>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

function CurrentFitness({ navigation }) {
  const [pushUp, setPushUp] = useState('');
  const [sitUp, setSitUp] = useState('');
  const [run, setRun] = useState('');
  const [isCheckedPush, setCheckedPush] = useState(false);
  const [isCheckedSit, setCheckedSit] = useState(false);
  const [isCheckedRun, setCheckedRun] = useState(false);
  const [isPushEditable, setIsPushEditable] = useState(true);
  const [isSitEditable, setIsSitEditable] = useState(true);
  const [isRunEditable, setIsRunEditable] = useState(true);

  function PushFunction() {
    setCheckedPush(!isCheckedPush);
    setIsPushEditable(!isPushEditable);
    global.pushExemption = { isPushEditable };

  }

  function SitFunction() {
    setCheckedSit(!isCheckedSit);
    setIsSitEditable(!isSitEditable);
    global.sitExemption = { isSitEditable };
  }

  function RunFunction() {
    setCheckedRun(!isCheckedRun);
    setIsRunEditable(!isRunEditable);
    global.runExemption = { isRunEditable };
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={8}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />
        <Text style={[style.shadowProp, styles.requestText]}>What is your current{'\n'} fitness level?</Text>

        <View style={styles.fitnessContainer}>
          <TextInput
            placeholder={isPushEditable ? 'Push-Ups' : 'Exempted'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setPushUp(text)}
            value={pushUp}
            editable={isPushEditable}
          />

          <TextInput
            placeholder={isSitEditable ? 'Sit-Ups' : 'Exempted'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setSitUp(text)}
            value={sitUp}
            editable={isSitEditable}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isCheckedPush}
            onValueChange={PushFunction}
            color={isCheckedPush ? '#000000' : undefined}
          />
          <Text style={styles.exemptedText}>Exempted</Text>
        </View>

        <View style={styles.checkboxContainer2}>
          <Checkbox
            value={isCheckedSit}
            onValueChange={SitFunction}
            color={isCheckedSit ? '#000000' : undefined}
          />
          <Text style={styles.exemptedText}>Exempted</Text>
        </View>

        <View style={styles.runContainer}>
          <TextInput
            placeholder={isRunEditable ? '2.4 KM Run' : 'Exempted'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='numbers-and-punctuation'
            returnKeyType='done'
            onChangeText={text => setRun(text)}
            value={run}
            editable={isRunEditable}
          />
          <View style={styles.checkboxContainer3}>
            <Checkbox
              value={isCheckedRun}
              onValueChange={RunFunction}
              color={isCheckedRun ? '#000000' : undefined}
            />
            <Text style={styles.exemptedText}>Exempted</Text>
          </View>
        </View>

        <View style={styles.moveContainer}>
          <Pressable style={styles.fitnessBackButton2}
            onPress={() => {
              navigation.navigate('PersonalDetails');
            }}>
            <View style={styles.alignContainer}>
              <Image source={back} style={styles.nextIcon}></Image>
              <Text style={styles.fitnessBackText}> Back</Text>
            </View>
          </Pressable>
          <Pressable style={styles.fitnessNextButton2}
            onPress={() => {
              InitData = {
                ...InitData,
                currentAbilities: {
                  pushUpCount: pushUp,
                  sitUpCount: sitUp,
                  runTimeInSeconds: run
                }
              };
              navigation.navigate('TargetFitness');
            }}>
            <View style={styles.alignContainer}>
              <Text style={styles.fitnessNextText}>Next </Text>
              <Image source={next}></Image>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

function TargetFitness({ navigation }) {
  const [targetPushUp, setTargetPushUp] = useState('');
  const [targetSitUp, setTargetSitUp] = useState('');
  const [targetRun, setTargetRun] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={8}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />

        <Text style={[style.shadowProp, styles.requestText]}>What is your goal?</Text>

        <View style={styles.fitnessContainer}>
          <TextInput
            placeholder={!global.pushExemption ? 'Target Push-Ups' : 'Exempted'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setTargetPushUp(text)}
            value={targetPushUp}
            editable={!global.pushExemption}
          />

          <TextInput
            placeholder={!global.sitExemption ? 'Target Sit-Ups' : 'Exempted'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setTargetSitUp(text)}
            value={targetSitUp}
            editable={!global.sitExemption}
          />
        </View>

        <View style={styles.runContainer}>
          <TextInput
            placeholder={!global.runExemption ? 'Target Run' : 'Exempted'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='numbers-and-punctuation'
            returnKeyType='done'
            onChangeText={text => setTargetRun(text)}
            value={targetRun}
            editable={!global.runExemption}
          />
        </View>

        <View style={styles.moveContainer}>
          <Pressable style={styles.fitnessBackButton2}
            onPress={() => {
              navigation.navigate('CurrentFitness');
            }}>
            <View style={styles.alignContainer}>
              <Image source={back} style={styles.nextIcon}></Image>
              <Text style={styles.fitnessBackText}> Back</Text>
            </View>
          </Pressable>
          <Pressable style={styles.fitnessNextButton3}
            onPress={() => {
              InitData = {
                ...InitData,
                targetAbilities: {
                  pushUpCount: targetPushUp,
                  sitUpCount: targetSitUp,
                  runTimeInSeconds: targetRun
                }
              };
              navigation.navigate('LocationRecommender');
            }}>
            <View style={styles.alignContainer}>
              <Text style={styles.fitnessNextText}>Let's Go! </Text>
              <Image source={next}></Image>
            </View>
          </Pressable>
        </View>

      </ImageBackground>
    </View>
  );
}

function LocationRecommender({ navigation }) {
  const [pressed, setPressed] = useState(false);
  const [dataReq, setDataReq] = useState('')
  const toggle = () => setPressed(previousState => !previousState);

  useEffect(() => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(InitData)
    };
    fetch("http://52.77.246.182:3000/users", requestOptions)
      .then(response => response.json())
      .then(data => setDataReq(data));
  }, [pressed])

  // const putUser = async () => {
  //   try {
  //     fetch("http://52.77.246.182:3000/users", {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         username: "Jimmy",
  //         password: "password"
  //       })
  //     });
  //     const response = await response.json();
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error: " + error);
  //   } finally {
  //     console.log("End Request")
  //   }
  // }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>recommend location</Text>
      <Button
        title='refresh'
        onPress={toggle}
      />
      <Button
        title="Next"
        onPress={() => {
          toggle();
          navigation.navigate('BottomTab');
        }}
      />
    </View>
  );
}

export default function InitScreen(props) {
  let [fontsLoaded] = useFonts({
    'Montserrat': require('../assets/fonts/static/Montserrat-Black.ttf'),
    'Montserrat-Medium': require('../assets/fonts/static/Montserrat-Medium.ttf'),

  }); // Change as needed

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <InitStack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{
        headerShown: false,
      }}>
      <InitStack.Screen name="GetStarted" component={GetStarted} />
      <InitStack.Screen name="Login" component={Login} />
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
