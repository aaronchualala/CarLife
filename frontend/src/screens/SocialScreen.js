import {Text, View, ScrollView, Pressable, Alert, Image, Button, StyleSheet, Platform } from 'react-native';
import React, {useCallback, useState, useEffect, Component} from 'react';
import * as styles from '../css/SocialScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {Ionicon} from '../assets/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
    Bubble,
    GiftedChat,
    SystemMessage,
    IMessage,
    Send,
    SendProps,
  } from 'react-native-gifted-chat'

const SocialStack = createNativeStackNavigator();
const numNearbyUsers = 10; 

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

function SocialScreenSelections({navigation : {navigate}}){

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/fonts/static/Montserrat-Regular.ttf'),
        'Montserrat-Light': require('../assets/fonts/static/Montserrat-Light.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/static/Montserrat-SemiBold.ttf'),
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
    
    return (
        <><View style={globalStyles.banner} onLayout={onLayoutRootView}>
            <Text style={globalStyles.bannerText}>Social</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Nearby Users</Text>
            <Pressable style={styles.profileContainer} onPress={() => {
                let name = 'Ayushman Dixit';
                let score = 100;
                let distance = 50;
                navigate('ChatScreen', {name: ['Ayushman Dixit']})}}>
                <View style={styles.profileImageContainer}>
                    <Image source={require('../assets/Images/profileIcon1.png')}></Image>
                </View>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.profileName}>Ayushman Dixit</Text>
                    <Text style={styles.profileDetails}>100 points</Text>
                    <Text style={styles.profileDetails}>50m away</Text>
                </View>
            </Pressable>

            <View></View>

            <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
                <View style={styles.profileImageContainer}>
                    <Image source={require('../assets/Images/profileIcon1.png')}></Image>
                </View>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.profileName}>Marc Chern</Text>
                    <Text style={styles.profileDetails}>100 points</Text>
                    <Text style={styles.profileDetails}>50m away</Text>
                </View>
            </Pressable>

            <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
                <View style={styles.profileImageContainer}>
                    <Ionicon
                        size="extraLarge"
                        color="black"
                        name="person-outline" />
                </View>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.profileName}>Name</Text>
                    <Text style={styles.profileDetails}>100 points</Text>
                    <Text style={styles.profileDetails}>50m away</Text>
                </View>
            </Pressable>

            <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
                <View style={styles.profileImageContainer}>
                    <Ionicon
                        size="extraLarge"
                        color="black"
                        name="person-outline" />
                </View>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.profileName}>Name</Text>
                    <Text style={styles.profileDetails}>100 points</Text>
                    <Text style={styles.profileDetails}>50m away</Text>
                </View>
            </Pressable>

            <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
                <View style={styles.profileImageContainer}>
                    <Ionicon
                        size="extraLarge"
                        color="black"
                        name="person-outline" />
                </View>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.profileName}>Name</Text>
                    <Text style={styles.profileDetails}>100 points</Text>
                    <Text style={styles.profileDetails}>50m away</Text>
                </View>
            </Pressable>

            <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
                <View style={styles.profileImageContainer}>
                    <Ionicon
                        size="extraLarge"
                        color="black"
                        name="person-outline" />
                </View>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.profileName}>Name</Text>
                    <Text style={styles.profileDetails}>100 points</Text>
                    <Text style={styles.profileDetails}>50m away</Text>
                </View>
            </Pressable>

            <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
                <View style={styles.profileImageContainer}>
                    <Ionicon
                        size="extraLarge"
                        color="black"
                        name="person-outline" />
                </View>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.profileName}>Name</Text>
                    <Text style={styles.profileDetails}>100 points</Text>
                    <Text style={styles.profileDetails}>50m away</Text>
                </View>
            </Pressable>

        </ScrollView>
    </>
    );
}

function ChatScreen({navigation, route}) {
    const [messages, setMessages] = useState([]);

    const user = {
        _id: 1,
        name: 'Developer',
    }

    const otherUser = {
        _id: 2,
        name: 'React Native',
        avatar: '../assets/Images/profileIcon1.png',
      }
      
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Ayushman',
              avatar: require('../assets/Images/profileIcon1.png'),
            },
          },
        ])
      }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

    return(
        <>
        <View style={styles.banner}>
            <View style={styles.button}>
                <Button
                    title="Back"
                    onPress={() => navigation.goBack()}
                    style={styles.button} />
            </View>
            <Text style={styles.bannerText}>{route.params.name[0]}</Text>
            <View style={styles.chatImgView}>
                <Image style={styles.chatProfileImg} source={require('../assets/Images/profileIcon1.png')} resizeMode={'contain'}></Image>
            </View>
        </View>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            
          infiniteScroll
            />        
        </>
    );
}


export default function SocialScreen() {
    return (
      <SocialStack.Navigator
        initialRouteName="SocialScreenSelections"
        screenOptions={{
          headerShown: false,
        }}>
        <SocialStack.Screen name="SocialScreenSelections" component={SocialScreenSelections} />
        <SocialStack.Screen name="ChatScreen" component={ChatScreen} />
      </SocialStack.Navigator>
    );
  }