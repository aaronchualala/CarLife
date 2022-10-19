import React, {useState, useEffect} from 'react';
import {Text, View, Button, Pressable, Image, Alert} from 'react-native';
import * as globalStyles from '../css/globals.css';
import * as styles from '../css/TrainScreen.module.css';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PoseDetector from './PoseDetector'
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';

const TrainStack = createNativeStackNavigator();

// Train Navigator
export default function TrainScreen(props) {
  return (
      <TrainStack.Navigator
        initialRouteName="Selections"
        screenOptions={{
          headerShown: false,
        }}>
        <TrainStack.Screen name="Selections" component={Selections} />
        <TrainStack.Screen name="PushUps" component={PoseDetector} />
        <TrainStack.Screen name="SitUps" component={PoseDetector} />
      </TrainStack.Navigator>
  );
}

// Train Screen (selection)
function Selections({navigation}) {
  const [runtime, setRuntime] = useState(0)
  const [refreshToken, setRefreshToken]= useState(null);
  const [accessToken, setAccessToken]= useState(null);
  const [authRequest, authResponse, authPromptAsync] = useAuthRequest(
    {
      clientId: '95627',
      scopes: ['activity:read_all'],
      redirectUri: 'myapp://myapp.com'
    },
    {
      authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
      tokenEndpoint: 'https://www.strava.com/oauth/token',
      revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
    }
  );

  // onClick function to send authrequest and get authresponse
  const getData = async()=>{
    try{
      await authPromptAsync()
    } catch(err){
      console.log(err)
    }
  }

  // get access+request token once authresponse comes back
  useEffect(()=>{
    const exchange = async () => {
      try{
        if(authResponse?.type === 'success'){
          const result = await AuthSession.exchangeCodeAsync(
            {
              clientId: '95627',
              redirectUri:'myapp://myapp.com',
              code: authResponse.params.code,
              extraParams: {
                client_secret: 'be2ba3e09b2e6ce8987c89f2cdc74af3da244268',
              },
            },
            {tokenEndpoint: 'https://www.strava.com/oauth/token'}
            );
            setAccessToken(result.accessToken);
            setRefreshToken(result.refreshToken);
        }
      } catch(err){
        console.log(err)
      }
    }
    exchange();
  }, [authResponse])
  
  // get runtime once access token is updated
  useEffect(()=>{
    const getRuntime = async () => {
      try{
        if(accessToken){
          const data = await fetch(`http://52.77.246.182:3000/others/strava/${accessToken}`)
          var alertMessage = await data.json();
          if(alertMessage != "We were unable to find any runs completed during the past 7 days."){
            alertMessage = `Successfully retrieved your latest 2.4km run time of ${Math.floor(parseInt(alertMessage)/60)} minutes and ${Math.round(parseInt(alertMessage))%60} seconds`
          }
          Alert.alert(alertMessage)
        }
      }catch(err){
        console.log(err)
      }
    }
    getRuntime()
  }, [[accessToken]])
  
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
        hitSlop={20} onPress={() => {getData()}} disabled={!authRequest}>          
            <Image style={styles.buttonImage} source={require('../assets/Images/run.png')}/>
            <Text style={{...styles.buttonText, order: 2}}>2.4km run</Text>
        </Pressable>
      </View></>
  );
}

// // Pushups Sub Screen
// function PushUps({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Pushups</Text>
//       <Button
//         title="Back"
//         onPress={() => {
//           navigation.navigate('Selections');
//         }}
//       />
//     </View>
//   );
// }

// // Situps Sub Screen
// function SitUps({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>SitUps</Text>
//       <Button
//         title="Back"
//         onPress={() => {
//           navigation.navigate('Selections');
//         }}
//       />
//     </View>
//   );
// }