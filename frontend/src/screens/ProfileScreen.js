import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Text, View, ScrollView, Button, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as styles from '../css/ProfileScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { MaterialIcon } from '../assets/MaterialIcons';
import { Ionicon } from '../assets/Ionicons';
import AppContext from '../components/AppContext';



const ProfileStack = createNativeStackNavigator();
var profileImg = require('../assets/Images/profileIconSummit.png');
function ProfilePage({ route, navigation }) {
  const {user, setUser} = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ "currentAbilities": { "pushUpCount": 0, "sitUpCount": 0, "runTimeInSeconds": 0 }, "pastResults": [null,null,null] });
  var todayYear = new Date().getUTCFullYear();
  var today = new Date();
  const [userAge, setUserAge] = useState(0);
  const [nextIPPT, setNextIPPT] = useState('');
  const [scoreData, setScoreData] = useState({ "result": { "name": "-" } });

  const getUsers = async () => {
    try {
      const response = await fetch('http://52.77.246.182:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password
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
    let userDate = new Date(user.birthdate).getUTCDate();
    let userMonth = new Date(user.birthdate).getUTCMonth();
    let userYear = new Date(user.birthdate).getUTCFullYear();
    var age = todayYear - userYear;
    var m = today.getMonth() - userMonth;
    if (m < 0 || (m === 0 && today.getDate() < userDate)) {
      age--;
    }
    setUserAge(age);
  }

  const setUserIPPTDate = () => {
    let userDate = new Date(user.birthdate).getUTCDate();
    let userMonth = new Date(user.birthdate).getUTCMonth();
    let userYear = new Date(user.birthdate).getFullYear();
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
    } else { setNextIPPT(`${userDate + 1}/${userMonth + 1}/${todayYear + 1}`) }
  }

  const calcScore = async () => {
    try {
      const res = await fetch(`http://52.77.246.182:3000/others/score/?age=${userAge}&pushups=${user.currentAbilities.pushUpCount}&situps=${user.currentAbilities.sitUpCount}&run=${user.currentAbilities.runTimeInSeconds}`);
      const json = await res.json();
      setScoreData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAge();
    setUserIPPTDate();
    calcScore();
  }, []);

  return (
    <>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Profile</Text>
      </View>
      <View style={styles.contentContainer} >
        <View style={styles.accountContainer}>
          <View style={styles.profilePic}>
            <Image source={profileImg}/>
          </View>
          <View style={styles.accountDetailsContainer}>
            <Text style={styles.titleText}>{user.name}</Text>
            <Text style={styles.detailText}>{userAge} years old</Text>
            <Text style={styles.detailText}>Last Result: {scoreData.result.name}</Text>
          </View>
        </View>
        <View style={styles.nextIpptContainer}>
          <View style={styles.ipptDateContainer}>
            <Text style={styles.ipptDate}>IPPT Window Closes:</Text>
            <Text style={styles.ipptDateData}>{nextIPPT}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

// function EditPage({ route, navigation }) {
//   const { lastResult, nextIPPT } = route.params;
//   const [newLastResult, setNewLastResult] = useState(lastResult);
//   const [newNextIPPT, setNewNextIPPT] = useState(nextIPPT);

//   return (
//     <View style={styles.editPageContainer}>
//       <View style={globalStyles.banner}>
//         <View style={styles.backButton}>
//           <Button
//             title="< Back"
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           />
//         </View>
//         <Text style={globalStyles.bannerText}>Edit Profile</Text>
//       </View>

//       <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
//         <Text style={styles.editPageHeaderText}>Last Result</Text>
//         <TextInput
//           style={globalStyles.textInputClass}
//           onChangeText={text => setNewLastResult(text)}
//           value={newLastResult}
//           clearTextOnFocus={true}
//           defaultValue={lastResult}
//         />
//         <Text style={styles.editPageHeaderText}>Next IPPT</Text>
//         <TextInput
//           style={globalStyles.textInputClass}
//           onChangeText={text => setNewNextIPPT(text)}
//           value={newNextIPPT}
//           clearTextOnFocus={true}
//           defaultValue={nextIPPT}
//         />
//         <Button
//           title="Save"
//           onPress={() => navigation.navigate('ProfilePage', {
//             name: name,
//             age: age,
//             lastResult: lastResult,
//             nextIPPT: nextIPPT,
//           })}
//         />
//       </View>
//     </View>
//   );
// };

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
      {/* <ProfileStack.Screen name="EditPage" component={EditPage} initialParams={{ nextIPPT: "01 Sept 2023" }} /> */}
    </ProfileStack.Navigator>
  )
}
