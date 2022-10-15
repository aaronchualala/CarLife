import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as styles from '../css/ProfileScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { MaterialIcon } from '../assets/MaterialIcons';
import { Ionicon } from '../assets/Ionicons';
import { OrangeButton } from '../components/Buttons';

const ProfileStack = createNativeStackNavigator();

function ProfilePage({ route, navigation }) {
  const { lastResult, nextIPPT } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const todayYear = new Date().getFullYear();
  const [userAge, setUserAge] = useState(0);
  
  const getUsers = async () => {
    try {
      const response = await fetch('http://52.77.246.182:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:"username3",
          password:"password"
        })
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = () => {
    let userYear = new Date(data.birthdate).getFullYear();
    setUserAge(todayYear - userYear);
  }

  
  useEffect(() => {
    getUsers();
  }, []);
  
  useEffect(() => {
    refreshUserData();
  }, [isLoading])

  return (
    <>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.accountContainer}>
          <View style={styles.profilePic}>
            <Ionicon
              size="extraLarge"
              color="black"
              name="person-outline"
            />
          </View>
          <View style={styles.accountDetailsContainer}>
            <Text style={styles.titleText}>{data.name}</Text>
            <Text style={styles.detailText}>{userAge} years old</Text>
            <Text style={styles.detailText}>Last Result: {lastResult}</Text>
          </View>
          <View style={styles.editProfile}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              navigation.navigate('EditPage', {
                lastResult: lastResult,
                nextIPPT: nextIPPT,
              });
            }} >
              <Ionicon
                size="extraLarge"
                color="black"
                name="create-outline"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nextIpptContainer}>
          <View style={styles.ipptDateContainer}>
            <Text style={styles.ipptDate}>Next IPPT: </Text>
            <Text style={styles.ipptDateData}>{nextIPPT}</Text>
          </View>
        </View>
        <View style={styles.activityGraphContainer}>
          <Text style={styles.sectionHeadText}>Progress</Text>
          {/* Graph */}
          <Text style={styles.sectionText}>You are on track! Keep it up!</Text>
        </View>
        <View style={styles.resultHistoryContainer}>
          <Text style={styles.sectionHeadText}>Past IPPT Results</Text>
          <View style={styles.resultEntry}>
            <Text style={styles.sectionText}>18 Apr 2021</Text>
            <Text style={styles.sectionText}>Silver</Text>
          </View>
          <View style={styles.resultEntry}>
            <Text style={styles.sectionText}>06 Sep 2020</Text>
            <Text style={styles.sectionText}>Pass</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

function EditPage({ route, navigation }) {
  const { lastResult, nextIPPT } = route.params;
  const [newLastResult, setNewLastResult] = useState(lastResult);
  const [newNextIPPT, setNewNextIPPT] = useState(nextIPPT);

  return (
    <View style={styles.editPageContainer}>
      <View style={globalStyles.banner}>
        <View style={styles.backButton}>
          <Button
            title="< Back"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text style={globalStyles.bannerText}>Edit Profile</Text>
      </View>

      <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
        <Text style={styles.editPageHeaderText}>Last Result</Text>
        <TextInput
          style={globalStyles.textInputClass}
          onChangeText={text => setNewLastResult(text)}
          value={newLastResult}
          clearTextOnFocus={true}
          defaultValue={lastResult}
        />
        <Text style={styles.editPageHeaderText}>Next IPPT</Text>
        <TextInput
          style={globalStyles.textInputClass}
          onChangeText={text => setNewNextIPPT(text)}
          value={newNextIPPT}
          clearTextOnFocus={true}
          defaultValue={nextIPPT}
        />
        <Button
          title="Save"
          onPress={() => navigation.navigate('ProfilePage', {
            name: name,
            age: age,
            lastResult: lastResult,
            nextIPPT: nextIPPT,
          })}
        />
      </View>
    </View>
  );
};

// export default ProfileScreen;

export default function ProfileScreen() {
  let [fontsLoaded] = useFonts({
    'Montserrat': require('../assets/fonts/static/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('../assets/fonts/static/Montserrat-Light.ttf'),
    'Montserrat-Black': require('../assets/fonts/static/Montserrat-Black.ttf'),
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
    <ProfileStack.Navigator
      initialRouteName="ProfilePage"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} initialParams={{ lastResult: 'Gold', nextIPPT: "01 Sept 2023" }} />
      <ProfileStack.Screen name="EditPage" component={EditPage} initialParams={{ lastResult: 'Gold', nextIPPT: "01 Sept 2023" }} />
    </ProfileStack.Navigator>
  )
}
