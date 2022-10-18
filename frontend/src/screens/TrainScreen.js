import React from 'react';
import {Text, View, Button, Pressable, Image} from 'react-native';
import * as globalStyles from '../css/globals.css';
import * as styles from '../css/TrainScreen.module.css';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PoseDetector from './PoseDetector'
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

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
WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};
function Run({navigation}) {
  const [authCode, setauthCode]= React.useState(null);
  const [refreshToken, setRefreshToken]= React.useState(null);
  const [accessToken, setAccessToken]= React.useState(null);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '95627',
      scopes: ['activity:read_all'],
      redirectUri: 'myapp://myapp.com'
    },
    discovery
  );
  // console.log(response.params.code); .url.split("&")[1].slice(5)
  console.log(response);
  async function exchange(){
    const result = await AuthSession.exchangeCodeAsync(
      {
        clientId: '95627',
        redirectUri:'myapp://myapp.com',
        code: authCode,
        extraParams: {
          client_secret: 'be2ba3e09b2e6ce8987c89f2cdc74af3da244268',
        },
      },
      {tokenEndpoint: 'https://www.strava.com/oauth/token'}
    );
    console.log(result);
    if (result.accessToken && result.refreshToken){
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
    }
    return;
  }
  React.useEffect(() => {
    async function fetchData (){
      if (response?.type === 'success') {
      setauthCode(response.params.code);
      console.log(authCode);
      await exchange();
      console.log(accessToken,refreshToken);
    }
  }
  fetchData();
  },[response]);
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Run</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
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
      <TrainStack.Screen name="PushUps" component={PoseDetector} />
      <TrainStack.Screen name="SitUps" component={SitUps} />
      <TrainStack.Screen name="Run" component={Run} />
    </TrainStack.Navigator>
  );
}
