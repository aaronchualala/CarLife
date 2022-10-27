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
import { getJSDocReadonlyTag } from 'typescript';

const ProfileStack = createNativeStackNavigator();

function ProfilePage({ route, navigation }) {
  // const { nextIPPT } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ "currentAbilities": { "pushUpCount": 0, "sitUpCount": 0, "runTimeInSeconds": 0 }, "pastResults": [null,null,null] });
  var todayYear = new Date().getUTCFullYear();
  var today = new Date();
  const [userAge, setUserAge] = useState(0);
  const [scoreData, setScoreData] = useState({ "result": { "name": "-" } });
  const [nextIPPT, setNextIPPT] = useState('');

  const getUsers = async () => {
    try {
      const response = await fetch('http://52.77.246.182:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: "Jimmy",
          password: "password"
        })
      });
      const json = await response.json();
      setData(json);
      setAge();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setAge = () => {
    let userDate = new Date(data.birthdate).getUTCDate();
    let userMonth = new Date(data.birthdate).getUTCMonth();
    let userYear = new Date(data.birthdate).getUTCFullYear();
    var age = todayYear - userYear;
    var m = today.getMonth() - userMonth;
    if (m < 0 || (m === 0 && today.getDate() < userDate)) {
      age--;
    }
    setUserAge(age);
  }

  const setUserIPPTDate = () => {
    let userDate = new Date(data.birthdate).getUTCDate();
    let userMonth = new Date(data.birthdate).getUTCMonth();
    let userYear = new Date(data.birthdate).getFullYear();
    if (userDate == 1) {
      switch (userMonth) {
        case 2:
        case 4:
        case 6:
        case 8:
        case 9:
        case 11:
          userDate = 31;
          break;
        case 1:
        case 5:
        case 7:
        case 10:
        case 12:
          userDate = 30;
          break;
        case 3:
          userDate = 28;
          break;
      }
    } else { userDate = userDate - 1 }

    var m = today.getUTCMonth() - userMonth;
    if (m < 0 || (m === 0 && today.getUTCDate() < userDate)) {
      setNextIPPT(`${userDate}/${userMonth}/${todayYear}`)
    } else { setNextIPPT(`${userDate}/${userMonth}/${todayYear + 1}`) }
  }

  const calcScore = async () => {
    try {
      const res = await fetch(`http://52.77.246.182:3000/others/score/?age=${userAge}&pushups=${data.currentAbilities.pushUpCount}&situps=${data.currentAbilities.sitUpCount}&run=${data.currentAbilities.runTimeInSeconds}`);
      const json = await res.json();
      setScoreData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setAge();
    setUserIPPTDate();
    calcScore();
  }, [isLoading])

  return (
    <>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Profile</Text>
      </View>
      {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
      <View style={styles.contentContainer} >
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
            <Text style={styles.detailText}>Last Result: {scoreData.result.name}</Text>
          </View>
          <View style={styles.editProfile}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              navigation.navigate('EditPage', {
                lastResult: scoreData.result.name,
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

        <View style={styles.resultHistoryContainer}>
          <Text style={styles.sectionHeadText}>Past IPPT Results</Text>
          {data.pastResults[0] ?
            <View style={styles.resultEntry}>
              <Text style={styles.sectionText}>{data.pastResults[0].date}</Text>
              <Text style={styles.resultText}>{data.pastResults[0].result}</Text>
            </View>
            : null}
          {data.pastResults[1] ?
            <View style={styles.resultEntry}>
              <Text style={styles.sectionText}>{data.pastResults[1].date}</Text>
              <Text style={styles.resultText}>{data.pastResults[1].result}</Text>
            </View>
            : null}
          {data.pastResults[2] ?
            <View style={styles.resultEntry}>
              <Text style={styles.sectionText}>{data.pastResults[2].date}</Text>
              <Text style={styles.resultText}>{data.pastResults[2].result}</Text>
            </View>
            : null}
        </View>
      </View>
      {/* </ScrollView> */}
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
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} initialParams={{ nextIPPT: "01 Sept 2023" }} />
      <ProfileStack.Screen name="EditPage" component={EditPage} initialParams={{ nextIPPT: "01 Sept 2023" }} />
    </ProfileStack.Navigator>
  )
}
