import {Text, View} from 'react-native';
import * as styles from '../css/ProfileScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {MaterialIcon} from '../assets/MaterialIcons';
import {Ionicon} from '../assets/Ionicons';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1, flexDirection:'column',justifyContent: 'flex-start', alignItems: 'center'}}>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Profile</Text>
      </View>
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
    </View>
  );
};

export default ProfileScreen;
