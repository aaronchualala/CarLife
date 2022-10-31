import React, {useState, show} from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {View, Text, Button, TextInput, Pressable, PlatformColor, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as styles from '../css/InitScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { ImageBackground, StyleSheet} from 'react-native';
import { Image } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import DateTimePicker from '@react-native-community/datetimepicker';

const bgImage = require('../assets/BackgroundImages/GreyscaleRunningMan.png');
const logo = require('../assets/BackgroundImages/FitBudsLogo.png');
const next = require('../assets/BackgroundImages/next.png')
const InitStack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();
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
      <ImageBackground source ={bgImage}  style = {{height:'100%', width:'100%'}} blurRadius={3.5}>
        <View style={styles.overlayView}/>
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
      <View style={styles.overlayView}/>
      <Image source={logo} style={styles.logoClass}/>
      <Text style={[styles.headerText, style.shadowProp]}>Registration</Text>
      <TextInput
        placeholder='Email'
        placeholderTextColor={"#363535"}
        style={styles.textInputClass}
        textContentType = 'emailAddress'
        keyboardType='email-address'
        spellCheck = 'true'
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor={"#363535"}
        style={styles.textInputClass}
        textContentType = 'password'
        secureTextEntry = 'true'
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
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS == 'ios');
    setDate(currentDate);
  }

  const showMode = (currentMode) =>{
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground source ={bgImage}  style = {{height:'100%', width:'100%'}} blurRadius={8}>
      <View style={styles.overlayView}/>
      <Image source={logo} style={styles.logoClass}/>
      <Text style ={[style.shadowProp,styles.requestText]}>What do we call you?</Text>
      <TextInput
        placeholder='Name'
        placeholderTextColor={"#808080"}
        style={styles.textInputClass}
        textContentType ='name'
        onChangeText={text => setName(text)}
        value={name}
      />
      <View style = {styles.datePadding}></View>
      <Text style ={[style.shadowProp,styles.requestText]}>What is your postal code?</Text>
      <TextInput
        placeholder='Postal Code'
        placeholderTextColor={"#808080"}
        style={styles.textInputClass}
        keyboardType = 'number-pad'
        returnKeyType='done'
        maxLength={6}
        textContentType = 'postalCode'
        onChangeText={text => setAddress(text)}
        value={address}
        />
         <Text style ={[style.shadowProp,styles.requestText]}>What is your date of birth?</Text>
      <View style = {styles.datePadding}></View>

        {show &&(
          <View style = {styles.dateContainer}>
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode = {mode}
        onChange = {onChange}
        />
        </View>)}

        <Pressable style = {styles.fitnessNextButton} 
        onPress={() => {
          navigation.navigate('CurrentFitness');
        }}>
          <View style = {styles.alignContainer}>
        <Text style={styles.fitnessNextText}>Next </Text>
        <Image source={next} style = {styles.nextIcon}></Image>
        </View>
        </Pressable>
    </ImageBackground>
    </View>
  );
}

function CurrentFitness({navigation}) {
  const [pushUp, setPushUp] = useState('');
  const [sitUp, setSitUp] = useState('')
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <ImageBackground source ={bgImage}  style = {{height:'100%', width:'100%'}} blurRadius={8}>
      <View style={styles.overlayView}/>
      <Image source={logo} style={styles.logoClass}/>
      <Text style ={[style.shadowProp,styles.requestText]}>What is your current{'\n'} fitness level?</Text>
      <View style = {styles.fitnessContainer}>
      <TextInput
        placeholder='Push-Ups'
        placeholderTextColor={"#808080"}
        style={styles.fitnessInputClass}
        keyboardType = 'number-pad'
        returnKeyType='done'
        onChangeText={text => setPushUp(text)}
        value={pushUp}
      />
       <TextInput
        placeholder='Sit-Ups'
        placeholderTextColor={"#808080"}
        style={styles.fitnessInputClass}
        keyboardType = 'number-pad'
        returnKeyType='done'
        onChangeText={text => setSitUp(text)}
        value={sitUp}
      />
      </View>
      <Button
        title="Back"
        onPress={() => navigation.navigate('PersonalDetails')}
      />
      <Button
        title="Next"
        onPress={() => navigation.navigate('TargetFitness')}
      />
      </ImageBackground>
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
  let [fontsLoaded] = useFonts({
    'Montserrat': require('../assets/fonts/static/Montserrat-Black.ttf'),
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
