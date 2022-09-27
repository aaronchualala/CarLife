import React, { useEffect, useState } from 'react';
import {Text, View, ScrollView, Button, Alert, TouchableOpacity, TextInput} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as styles from '../css/ProfileScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {MaterialIcon} from '../assets/MaterialIcons';
import {Ionicon} from '../assets/Ionicons';
import { OrangeButton } from '../components/Buttons';

const ProfileStack = createNativeStackNavigator();

var details = {name:"Mingyang Koh", age:"22", lastResult:'Gold', nextIPPT:"01 Sept 2023"};

function ProfilePage({navigation}) {
  const [name,setName] = useState(details.name);
  useEffect(()=>{
    setName(details.name);
  })
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
          <Text style={styles.detailText}>{details.age} years old</Text>
          <Text style={styles.detailText}>Last Result: {details.lastResult}</Text>
        </View>
        <View style={styles.editProfile}>
          <TouchableOpacity onPress={() => navigation.navigate('EditPage')} activeOpacity={0.8}>
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
          <Text style={styles.ipptDateData}>{details.nextIPPT}</Text>
        </View>          
        <OrangeButton title="Change Date" onPress={() => Alert.alert('Simple Button pressed')} />
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

function EditPage({navigation}) {
  const [name,setName] = useState('');
  const [age,setAge] = useState('');
  const [lastResult,setLastResult] = useState('');
  const [nextIPPT, setNextIPPT] = useState('');

  return (
    <View style={styles.editContainer}>
      <Text>Name</Text>
      <TextInput
        style={globalStyles.textInputClass}
        onChangeText={text => setName(text)}
        value={name}
      />
      <Text>Age</Text>
      <TextInput
        style={globalStyles.textInputClass}
        onChangeText={text => setAge(text)}
        value={age}
      />
      <Button
        title="Save"
        onPress={() => {
          details = {name: name, age: age};
        }}
      />
      <Text style={styles.titleText}>{details.name}</Text>
      <Button
        title="Back"
        onPress={() => navigation.navigate('ProfilePage')}
      />
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
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
      <ProfileStack.Screen name="EditPage" component={EditPage} />
    </ProfileStack.Navigator>
  )
}
