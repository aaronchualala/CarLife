import {Text, View, ScrollView, Button, Alert} from 'react-native';
import * as styles from '../css/ProfileScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {MaterialIcon} from '../assets/MaterialIcons';
import {Ionicon} from '../assets/Ionicons';
import { OrangeButton } from '../components/Buttons';

const ProfileScreen = () => {
  return (
    <>
    <View style={globalStyles.banner}>
      <Text style={globalStyles.bannerText}>Profile</Text>
    </View>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View id="accountContainer" style={styles.accountContainer}>
        <View id="profilePic" style={styles.profilePic}>
          <Ionicon
            size="extraLarge"
            color="black"
            name="person-outline"
          />
        </View>
        <View style={styles.accountDetailsContainer}>
          <Text style={styles.titleText}>Mingyang Koh</Text>
          <Text style={styles.detailText}>22 years old</Text>
          <Text style={styles.detailText}>Last Result: Gold</Text>
        </View>
      </View>
      <View style={styles.nextIpptContainer}>
        <View style={styles.ipptDateContainer}>
          <Text style={styles.ipptDate}>Next IPPT: </Text>
          <Text style={styles.ipptDateData}>01 Sept 2023</Text>
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

export default ProfileScreen;
