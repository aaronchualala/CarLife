import {Text, View, ScrollView, Pressable, Alert, Image} from 'react-native';
import { useCallback } from 'react';
import * as styles from '../css/SocialScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {Ionicon} from '../assets/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const numNearbyUsers = 4; 

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

function SocialScreen() {

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/fonts/static/Montserrat-Regular.ttf'),
        'Montserrat-Light': require('../assets/fonts/static/Montserrat-Light.ttf')
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
                <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
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

export default SocialScreen;
