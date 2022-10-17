import { useState, useEffect } from 'react';
// import { getDoc, doc } from 'firebase/firestore';
import { Pressable, ScrollView, Text, View } from 'react-native';
import * as styles from '../css/PlanScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { MaterialIcon } from '../assets/MaterialIcons';
import { Ionicon } from '../assets/Ionicons';
// import { app, auth, db } from '../firebase/config';
import { OrangeButton } from '../components/Buttons';

const NormalExSet = (props) => {
  const exerciseStateIcon = ["checkmark-circle-outline", "chevron-forward-circle-outline", "remove-circle-outline"];
  const color = ["#FCBF49", "#F77F00", "#8D99AE"];
  const stateText = ["Completed", "Train Now", "Not Available"];
  const [stateIdx, setStateIdx] = useState(props.state)

  const updateState = () => {
    if (stateIdx == 1) {
      setStateIdx(0);
      props.update(props.set);
    }
  }
  let timeSec = props.data.runTimeInSeconds % 60;
  let timeMin = Math.floor(props.data.runTimeInSeconds / 60);

  return (
    <View style={styles.set /*one set*/}>
      <Text style={{ ...styles.setText, color: `${color[stateIdx]}` }}>Set {props.set}</Text>
      <View style={styles.setExercisesContainer}>
        <View style={styles.exercisesContainer} >
          <Text style={{ ...styles.exerciseNameText, color: `${color[stateIdx]}` }}>{props.data.pushups} PUSH-UPS</Text>
          <Text style={{ ...styles.exerciseNameText, color: `${color[stateIdx]}` }}>{props.data.situps} SIT-UPS</Text>
          {props.set % 3 == 0 ? <Text style={{ ...styles.exerciseNameText, color: `${color[stateIdx]}` }}>{timeMin}:{timeSec} 2.4km Run</Text> : null}
        </View>
        <Pressable
          onPress={updateState}
          style={styles.exerciseState}
        >
          <Ionicon
            name={exerciseStateIcon[stateIdx]}
            size="superLarge"
            color={color[stateIdx]}
          />
          <Text style={{ ...styles.exerciseStateText, color: `${color[stateIdx]}` }}>{stateText[stateIdx]}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const RelatedExSet = (props) => {
  const exerciseStateIcon = ["checkmark-circle-outline", "chevron-forward-circle-outline", "remove-circle-outline"];
  const color = ["#FCBF49", "#F77F00", "#8D99AE"];
  const stateText = ["Completed", "Train Now", "Not Available"];
  const [stateIdx, setStateIdx] = useState(props.state)

  const updateState = () => {
    if (stateIdx == 1) {
      setStateIdx(0);
      props.update(props.set);
    }
  }

  return (
    <View style={styles.set /*one set*/}>
      <Text style={{ ...styles.setText, color: `${color[stateIdx]}` }}>Set {props.set}</Text>
      <View style={styles.setExercisesContainer}>
        <View style={styles.exercisesContainer} >
          <Text style={{ ...styles.exerciseNameText, color: `${color[stateIdx]}` }}>10 DUMBELL ROWS</Text>
          <Text style={{ ...styles.exerciseNameText, color: `${color[stateIdx]}` }}>8 SHOULDER PRESS</Text>
          <Text style={{ ...styles.exerciseNameText, color: `${color[stateIdx]}` }}>8 BICEP CURLS</Text>
        </View>
        <Pressable
          onPress={updateState}
          style={styles.exerciseState}
        >
          <Ionicon
            name={exerciseStateIcon[stateIdx]}
            size="superLarge"
            color={color[stateIdx]}
          />
          <Text style={{ ...styles.exerciseStateText, color: `${color[stateIdx]}` }}>{stateText[stateIdx]}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const PlanScreen = () => {
  let nowTime = new Date();
  let today = `${nowTime.getDate().toString()}/${nowTime.getMonth().toString()}/${nowTime.getFullYear().toString()}`;

  const [exStateId, setExStateID] = useState({ 0: 1, 1: 2, 2: 1, 3: 2, 4: 2, 5: 2 })
  const updateStateID = (set) => {
    setExStateID(previousState => { return ({ ...previousState, [set]: 1 }) });
  }
  useEffect(() => {
    renderSets()
    renderRel() 
    if (exStateId[3] === 1){
      setShowPopUp(previousState => !previousState)
      setShowRelated(true)
    }
  }, [exStateId])

  const renderSets = () => {
    
    return (
      <>
        <NormalExSet data={dataNormal} set={1} state={exStateId[0]} update={updateStateID} />
        <NormalExSet data={dataNormal} set={2} state={exStateId[1]} update={updateStateID} />
        <NormalExSet data={dataNormal} set={3} state={exStateId[2]} update={updateStateID} />
      </>
    )
  }
  const renderRel = () => {
    return (
      <>
        <RelatedExSet data={dataRelated} set={1} state={exStateId[3]} update={updateStateID} />
        <RelatedExSet data={dataRelated} set={2} state={exStateId[4]} update={updateStateID} />
        <RelatedExSet data={dataRelated} set={3} state={exStateId[5]} />
      </>
    )
  }

  const [showPopUp, setShowPopUp] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const togglePopUp = () => {
    if (exStateId[3] == 1)
      setShowPopUp(previousState => !previousState)
    setShowRelated(true)
  }

  const [dataNormal, setDataNormal] = useState();
  const [dataRelated, setDataRelated] = useState();
  const [isNormalLoading, setNormalLoading] = useState(true);
  const [isRelatedLoading, setRelatedLoading] = useState(true);

  const getNormalEx = async () => {
    try {
      const response = await fetch('http://52.77.246.182:3000/getExercise/normal/3');
      const json = await response.json();
      setDataNormal(json);
    } catch (error) {
      console.error(error);
    } finally {
      setNormalLoading(false);
    }
  };

  const getRelatedEx = async () => {
    try {
      const response = await fetch('http://52.77.246.182:3000/getExercise/related/3');
      const json = await response.json();
      setDataRelated(json);
    } catch (error) {
      console.error(error);
    } finally {
      setRelatedLoading(false);
    }
  };

  useEffect(() => {
    getNormalEx();
    getRelatedEx();
  }, []);

  return (
    <>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Training Plan</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.daysToGoContainer}>
          <Text style={styles.daysToGoText}><Text style={styles.daysToGoTextDays}>128</Text> Days to IPPT Gold</Text>
          <OrangeButton title="Test Location: Maju" onPress={togglePopUp} />
        </View>
        <View style={styles.exercisePlanContainer}>
          {showPopUp == true ? <View style={styles.bonusPopUpContainer}>
            <Text style={styles.PopUpText}>Congratulations on completing your daily workout!</Text>
            <Text style={styles.PopUpText}>Would you like to try some bonus exercises?</Text>
            <OrangeButton title="Let's Go!" onPress={togglePopUp} />
          </View> : null}
          <View style={styles.exerciseDateContainer}>
            <Text style={styles.exerciseDateText}>{today}</Text>
            <MaterialIcon size="extraLarge" color={"#F77F00"} name="calendar-today" />
          </View>

          <View style={styles.setsContainer}>
            {isNormalLoading ? null : renderSets()}

          </View>
        </View>
        {showRelated ?
          <View style={styles.bonusExercisesContainer}>
            <Text style={styles.bonusExercisesHeaderText}>Bonus Exercises</Text>
            <View style={styles.setsContainer}>
              {isRelatedLoading ? null : renderRel()}
            </View>
          </View> : null}
      </ScrollView>
    </>
  );
};

export default PlanScreen;
