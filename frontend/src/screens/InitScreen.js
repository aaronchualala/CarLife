import React, { useState, show, useEffect, useRef, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, Button, TextInput, Pressable, Platform, Image, ImageBackground, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as styles from '../css/InitScreen.module.css';
import * as globalStyles from '../css/globals.css';
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

function GetStarted({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={3.5}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />
        <Text style={[styles.sloganClass, style.shadowProp]}>FITTER,{'\n'}TOGETHER</Text>
        <View style={{ alignSelf: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
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
  const [loginData, setLoginData] = useState({});
  const [dataReq, setDataReq] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [failed, setFailed] = useState(false);

  let initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
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
  }, [dataReq])

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
          <Text style={styles.failedText} >User does not exist</Text> :
          null
        }
      </ImageBackground>
    </View>
  )
}

function Registration({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [validLen, setValidLen] = useState(false);
  const [validChar, setValidChar] = useState(false)
  const [validNum, setValidNum] = useState(false)
  const [validNoUser, setValidNoUser] = useState(false)

  const renderValid = () => {
    const rendered = []
    if (!validLen) {
      rendered.push(
        <Text style={styles.validText}>Password must be at least 8 Characters!</Text>
      )
    }
    if (!validChar){
      rendered.push(
        <Text style={styles.validText}>Password does not contain any characters</Text>
      )
    }
    if (!validNum){
      rendered.push(
        <Text style={styles.validText}>Password does not contain any numbers</Text>
      )
    }
    if (!validNoUser){
      rendered.push(
        <Text style={styles.validText} >Password should not contain Username!</Text>
      )
    }
    return rendered
  }

  let initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      pwValidator()

    }
  },[password])

  const pwValidator = () => {
    if (password.length > 8) {
      setValidLen(true)
    } else setValidLen(false);

    const regExpChar = /[A-Za-z]/
    if (password.match(regExpChar)) {
      setValidChar(true);
    } else setValidChar(false);

    const regExpDig = /[0-9]/
    if (password.match(regExpDig)){
      setValidNum(true);
    } else setValidNum(false);

    if (email != '' && password.toLowerCase().includes(email.toLowerCase())){
      setValidNoUser(false);
    } else setValidNoUser(true);

    if (validLen && validChar && validNum && validNoUser){
      setValid(true);
    } else setValid(false);
  }

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
        {valid ? null : 
          <View style={styles.validContainer}>
            {renderValid()}
          </View>
        }
        {valid ? <Pressable style={styles.nextButton}
          onPress={() => {
            InitData = { ...InitData, username: email, password: password };
            navigation.navigate('PersonalDetails');
          }}>
          <Text style={styles.nextText}>Next</Text>
        </Pressable> : null}
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
        <View style={styles.persDetContainer}>

          <Text style={[style.shadowProp, styles.requestText]}>What do we call you?</Text>
          <TextInput
            placeholder='Name'
            placeholderTextColor={"#808080"}
            style={styles.textInputClass}
            textContentType='name'
            onChangeText={text => setName(text)}
            value={name}
          />

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

          {show &&
            <View style={styles.dateContainer}>
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode={mode}
                onChange={onChange}
              />
            </View>}
        </View>

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={bgImage} style={{ height: '100%', width: '100%' }} blurRadius={8}>
        <View style={styles.overlayView} />
        <Image source={logo} style={styles.logoClass} />
        <Text style={[style.shadowProp, styles.requestText]}>What is your current{'\n'} fitness level?</Text>

        <View style={styles.fitnessContainer}>
          <TextInput
            placeholder={'Push-Ups'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setPushUp(text)}
            value={pushUp}
          />

          <TextInput
            placeholder={'Sit-ups'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setSitUp(text)}
            value={sitUp}
          />
        </View>

        <View style={styles.runContainer}>
          <TextInput
            placeholder={'2.4 KM Run'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='numbers-and-punctuation'
            returnKeyType='done'
            onChangeText={text => setRun(text)}
            value={run}
          />
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
            placeholder={'Target Push-Ups'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setTargetPushUp(text)}
            value={targetPushUp}
          />

          <TextInput
            placeholder={'Target Sit-Up'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='number-pad'
            returnKeyType='done'
            onChangeText={text => setTargetSitUp(text)}
            value={targetSitUp}
          />
        </View>

        <View style={styles.runContainer}>
          <TextInput
            placeholder={'Target Run'}
            placeholderTextColor={"#808080"}
            style={styles.fitnessInputClass}
            keyboardType='numbers-and-punctuation'
            returnKeyType='done'
            onChangeText={text => setTargetRun(text)}
            value={targetRun}
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
