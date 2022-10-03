import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { ScrollView, Text, View } from 'react-native';
import * as styles from '../css/PlanScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { MaterialIcon } from '../assets/MaterialIcons';
import { Ionicon } from '../assets/Ionicons';
import { app, auth, db } from '../firebase/config';
import { OrangeButton } from '../components/Buttons';

const PlanScreen = () => {
  const uid = auth.currentUser
    ? auth.currentUser.uid
    : '1XP3xsuWTYRwPdQtReFGfE5SwDm2';
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const currentUserInfo = await getDoc(doc(db, 'userInfo', uid));
      setEmail(currentUserInfo.data().email);
    };
    fetchData().catch(console.error);
  }, [uid, email]);

  return (
    <>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Training Plan</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.daysToGoContainer}>
          <Text style={styles.daysToGoText}>128 Days to IPPT Gold</Text>
          <OrangeButton title="Test Location: Maju" />
        </View>
        <View style={styles.exercisePlanContainer}>
          <View style={styles.exerciseDateContainer}>
            <Text style={styles.exerciseDateText}>4 Sep 2022</Text>
            <MaterialIcon size="extraLarge" color={"#F77F00"} name="calendar-today" />
          </View>

          <View style={styles.setsContainer}>
            <View style={styles.set /*one set*/}>
              <Text style={{ ...styles.setText, color: "#FCBF49" }}>Set 1</Text>
              <View style={styles.setExercisesContainer}>
                <View style={styles.exercisesContainer} >
                  <Text style={{ ...styles.exerciseNameText, color: "#FCBF49" }}>20 PUSH-UPS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#FCBF49" }}>20 SIT-UPS</Text>
                </View>
                <View style={styles.exerciseState}>
                  <Ionicon
                    name="ios-checkmark-circle-outline"
                    size="superLarge"
                    color="#FCBF49"
                  />
                  <Text style={{ ...styles.exerciseStateText, color: "#FCBF49" }}>Completed</Text>
                </View>
              </View>
            </View>
            <View style={styles.set /*one set*/}>
              <Text style={{ ...styles.setText, color: "#F77F00" }}>Set 2</Text>
              <View style={styles.setExercisesContainer}>
                <View style={styles.exercisesContainer} >
                  <Text style={{ ...styles.exerciseNameText, color: "#F77F00" }}>20 PUSH-UPS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#F77F00" }}>20 SIT-UPS</Text>
                </View>
                <View style={styles.exerciseState}>
                  <Ionicon
                    name="ios-chevron-forward-circle-outline"
                    size="superLarge"
                    color="#F77F00"
                  />
                  <Text style={{ ...styles.exerciseStateText, color: "#F77F00" }}>Train Now</Text>
                </View>
              </View>
            </View>
            <View style={styles.set /*one set*/}>
              <Text style={{ ...styles.setText, color: "#8D99AE" }}>Set 3</Text>
              <View style={styles.setExercisesContainer}>
                <View style={styles.exercisesContainer} >
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>20 PUSH-UPS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>20 SIT-UPS</Text>
                </View>
                <View style={styles.exerciseState}>
                  <Ionicon
                    name="ios-remove-circle-outline"
                    size="superLarge"
                    color="#8D99AE"
                  />
                  <Text style={{ ...styles.exerciseStateText, color: "#8D99AE" }}>Not Available</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bonusExercisesContainer}>
          <Text style={styles.bonusExercisesHeaderText}>Bonus Exercises</Text>
          <View style={styles.setsContainer}>
            <View style={styles.set /*one set*/}>
              <Text style={{ ...styles.setText, color: "#FCBF49" }}>Set 1</Text>
              <View style={styles.setExercisesContainer}>
                <View style={styles.exercisesContainer} >
                  <Text style={{ ...styles.exerciseNameText, color: "#FCBF49" }}>10 DUMBELL ROWS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#FCBF49" }}>8 SHOULDER PRESS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#FCBF49" }}>8 BICEP CURLS</Text>
                </View>
                <View style={styles.exerciseState}>
                  <Ionicon
                    name="ios-checkmark-circle-outline"
                    size="superLarge"
                    color="#FCBF49"
                  />
                  <Text style={{ ...styles.exerciseStateText, color: "#FCBF49" }}>Completed</Text>
                </View>
              </View>
            </View>
            <View style={styles.set /*one set*/}>
              <Text style={{ ...styles.setText, color: "#8D99AE" }}>Set 2</Text>
              <View style={styles.setExercisesContainer}>
                <View style={styles.exercisesContainer} >
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>10 DUMBELL ROWS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>8 SHOULDER PRESS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>8 BICEP CURLS</Text>
                </View>
                <View style={styles.exerciseState}>
                  <Ionicon
                    name="ios-chevron-forward-circle-outline"
                    size="superLarge"
                    color="#8D99AE"
                  />
                  <Text style={{ ...styles.exerciseStateText, color: "#8D99AE" }}>Train Now</Text>
                </View>
              </View>
            </View>
            <View style={styles.set /*one set*/}>
              <Text style={{ ...styles.setText, color: "#8D99AE" }}>Set 3</Text>
              <View style={styles.setExercisesContainer}>
                <View style={styles.exercisesContainer} >
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>10 DUMBELL ROWS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>8 SHOULDER PRESS</Text>
                  <Text style={{ ...styles.exerciseNameText, color: "#8D99AE" }}>8 BICEP CURLS</Text>
                </View>
                <View style={styles.exerciseState}>
                  <Ionicon
                    name="ios-remove-circle-outline"
                    size="superLarge"
                    color="#8D99AE"
                  />
                  <Text style={{ ...styles.exerciseStateText, color: "#8D99AE" }}>Not Available</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PlanScreen;
