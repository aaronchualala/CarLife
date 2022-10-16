import {Text, View, ScrollView, Pressable, Alert, Image} from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import * as styles from '../css/SocialScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {Ionicon} from '../assets/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

var randomImages = [
    require('../assets/Images/profileIcon0.png'),
    require('../assets/Images/profileIcon1.png'),
    require('../assets/Images/profileIcon2.png'),
    require('../assets/Images/profileIcon3.png'),
    require('../assets/Images/profileIcon4.png'),
    require('../assets/Images/profileIcon5.png'),
];
// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
function SocialScreen() {
    var nearbyUsersChatList
    const [nearbyUsers, setNearbyUsers] = useState([])

    useEffect(() =>{
        const fetchNearbyUsers = async() => {
            const data = await fetch("http://52.77.246.182:3000/findNearest/users?address=66+Nanyang+Crescent")
            const json = await data.json();
            setNearbyUsers(json.nearestUsers)
        }
        fetchNearbyUsers().catch(console.error)
    },[])

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
        <>
            <View style={globalStyles.banner} onLayout={onLayoutRootView}>
                <Text style={globalStyles.bannerText}>Social</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Nearby Users</Text>
                {nearbyUsers.map((nearbyUser)=>{
                    return(<Pressable key={nearbyUser[2]} style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
                        <View style={styles.profileImageContainer}>
                            <Image source={randomImages[(nearbyUsers.indexOf(nearbyUser)).toString()]}/>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Text style={styles.profileName}>{nearbyUser[0]}</Text>
                            <Text style={styles.profileDetails}>{nearbyUser[1]} points</Text>
                            <Text style={styles.profileDetails}>{Math.round(nearbyUser[2])}m</Text>
                        </View>
                    </Pressable>)
                })}
            </ScrollView>
        </>
    );
}

export default SocialScreen;
