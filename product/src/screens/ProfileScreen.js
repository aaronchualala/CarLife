import React, { useEffect, useState } from 'react';
import {Text, View, ScrollView, Button, Alert, TouchableOpacity, TextInput} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as styles from '../css/ProfileScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {MaterialIcon} from '../assets/MaterialIcons';
import {Ionicon} from '../assets/Ionicons';
import { OrangeButton } from '../components/Buttons';

const ProfileStack = createNativeStackNavigator();

function ProfilePage({route, navigation}) {
  const { name, age, lastResult, nextIPPT } = route.params;
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
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.detailText}>{age} years old</Text>
          <Text style={styles.detailText}>Last Result: {lastResult}</Text>
        </View>
        <View style={styles.editProfile}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
              navigation.navigate('EditPage',{
                name: name, 
                age: age,
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
        {/* <OrangeButton title="Change Date" onPress={() => Alert.alert('Simple Button pressed')} /> */}
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
  const { name, age, lastResult, nextIPPT } = route.params;
  const [newName,setNewName] = useState(name);
  const [newAge,setNewAge] = useState(age);
  const [newLastResult,setNewLastResult] = useState(lastResult);
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
      
      <View style={{flexDirection: 'column', alignSelf:'center'}}>
        <Text style={styles.editPageHeaderText}>Name</Text>
        <TextInput
          style={globalStyles.textInputClass}
          onChangeText={text => setNewName(text)}
          value={newName}
          clearTextOnFocus={true}
          defaultValue={name}
        />
        <Text style={styles.editPageHeaderText}>Age</Text>
        <TextInput
          style={globalStyles.textInputClass}
          onChangeText={text => setNewAge(text)}
          value={newAge}
          clearTextOnFocus={true}
          defaultValue={age}
          />
        <Text style={styles.editPageHeaderText}>Last Result</Text>
        <TextInput
          style={globalStyles.textInputClass}
          onChangeText={text => setNewLastResult(text)}
          value={newLastResult}
          clearTextOnFocus={true}
          defaultValue={lastResult}
          />
        <Text style={styles.editPageHeaderText}style={styles.editPageHeaderText}>Next IPPT</Text>
        <TextInput
          style={globalStyles.textInputClass}
          onChangeText={text => setNewNextIPPT(text)}
          value={newNextIPPT}
          clearTextOnFocus={true}
          defaultValue={nextIPPT}
          />
        <Button
          title="Save"
          onPress={() => navigation.navigate('ProfilePage',{
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
  return(
    <ProfileStack.Navigator
      initialRouteName="ProfilePage"
      screenOptions={{
        headerShown: false,
    }}>
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} initialParams={{name:'Mingyang Koh', age:"22", lastResult:'Gold', nextIPPT:"01 Sept 2023"}}/>
      <ProfileStack.Screen name="EditPage" component={EditPage} initialParams={{name:'Mingyang Koh', age:"22", lastResult:'Gold', nextIPPT:"01 Sept 2023"}}/>
    </ProfileStack.Navigator>
  )
}
