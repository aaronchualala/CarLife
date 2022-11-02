import { useState, useEffect, useCallback, useContext } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import * as styles from '../css/PlanScreen.module.css';
import * as globalStyles from '../css/globals.css';
import { MaterialIcon } from '../assets/MaterialIcons';
import { Ionicon } from '../assets/Ionicons';
import { useFonts } from 'expo-font';
import { OrangeButton } from '../components/Buttons';
import AppContext from '../components/AppContext';


const NormalExSet = (props) => {
  const exerciseStateIcon = ["checkmark-circle-outline", "chevron-forward-circle-outline", "remove-circle-outline"];
  const color = ["#FCBF49", "#F77F00", "#8D99AE"];
  const stateText = ["Completed", "Train Now", "Not Available"];
  const [stateIdx, setStateIdx] = useState(props.state)

  let timeSec = props.data.runTimeInSeconds % 60;
  let timeMin = Math.floor(props.data.runTimeInSeconds / 60);

  const updateState = () => {
    if (props.state == 1) {
      props.update(props.set);
      props.nav()
    }
  }

  useEffect(() => {
    setStateIdx(props.state)
  }, [props.state])

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
          onPress={() => {
            updateState()
          }}
          // onPress={updateState}
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
    if (props.state == 1) {
      props.update(props.set);
    }
  }

  useEffect(() => {
    setStateIdx(props.state)
  }, [props.state])

  return (
    <View style={styles.set /*one set*/}>
      <Text style={{ ...styles.setText, color: `${color[stateIdx]}` }}>Set {props.set - 3}</Text>
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

const PlanScreen = ({navigation}) => {
  const {user, setUser} = useContext(AppContext);
  let nowTime = new Date();
  let today = `${nowTime.getDate().toString()}/${(nowTime.getMonth() + 1).toString()}/${nowTime.getFullYear().toString()}`;

  const [showPopUp, setShowPopUp] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  const [exStateId, setExStateID] = useState({ 1: 1, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2 });

  const [dataNormal, setDataNormal] = useState({pushups:0, situps:0, runTimeInSeconds:0});
  const [dataRelated, setDataRelated] = useState();
  const [isNormalLoading, setNormalLoading] = useState(true);
  const [isRelatedLoading, setRelatedLoading] = useState(true);

  const [testLocal, setTestLocal] = useState('');
  const [relLocal, setRelLocal] = useState('');
  const [showLocalPU, setLocalPU] = useState(false);

  var todayYear = new Date().getUTCFullYear();
  const [userAge, setUserAge] = useState(0);
  const [nextIPPT, setNextIPPT] = useState('');
  const [scoreData, setScoreData] = useState({ "result": { "name": "-" } });
  const [daysLeft, setDaysLeft] = useState(0);

  const togglePopUp = () => {
    if (exStateId[4] === 1)
      setShowPopUp(previousState => !previousState)
    setShowRelated(true)
  }
  const toggleLocalPU = () => { setLocalPU(previousState => !previousState) }

  const updateStateID = (set) => {
    const newState = { ...exStateId, [set]: exStateId[set] - 1, [set + 1]: 1 };
    setExStateID(newState);
  }
  const updateNextID = (set) => {
  }

  useEffect(() => {
    if (exStateId[4] === 1 && !showRelated) {
      setShowPopUp(previousState => !previousState)
      setShowRelated(true)
    }
  }, [exStateId])

  const getNormalEx = async () => {
    try {
      const response = await fetch(`http://52.77.246.182:3000/getExercise/normal/${user.username}`);
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
      const response = await fetch(`http://52.77.246.182:3000/getExercise/related/${user.username}`);
      const json = await response.json();
      setDataRelated(json);
    } catch (error) {
      console.error(error);
    } finally {
      setRelatedLoading(false);
    }
  };

  const getTestLocal = async () => {
    try {
      const response = await fetch(`http://52.77.246.182:3000/findNearest/fcc?address=${user.residentialAddress}`); // set location based on address of user
      const json = await response.json();
      setTestLocal(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getRelLocal = async () => {
    try {
      const response = await fetch(`http://52.77.246.182:3000/findNearest/gym-and-park?address=${user.residentialAddress}`); // set location based on address of user
      const json = await response.json();
      setRelLocal(json);
    } catch (error) {
      console.error(error);
    }
  };

  const navToPoseDetector = () => navigation.navigate('Train', {screen: 'PushUps'},)

  const renderTestLocalPU = () => {
    return (
      <View style={styles.localPopUpContainer}>
        <Text style={styles.localPopUpText}>Test Locations around Singapore:</Text>
        <View style={styles.localPopUp}>
          <Text style={styles.localPopUpText}>Maju</Text>
        </View>
        <View style={styles.localPopUp}>
          <Text style={styles.localPopUpText}>Bedok</Text>
        </View>
        <View style={styles.localPopUp}>
          <Text style={styles.localPopUpText}>Khatib</Text>
        </View>
        <Pressable onPress={toggleLocalPU}>
          <View style={styles.localPopUpClose}>
            <Text style={styles.localPopUpCloseText}>Close</Text>
          </View>
        </Pressable>
      </View>
    )
  };

  const setAge = () => {
    let userDate = new Date(user.birthdate).getUTCDate();
    let userMonth = new Date(user.birthdate).getUTCMonth();
    let userYear = new Date(user.birthdate).getUTCFullYear();
    var age = todayYear - userYear;
    var m = nowTime.getMonth() - userMonth;
    if (m < 0 || (m === 0 && nowTime.getDate() < userDate)) {
      age--;
    }
    setUserAge(age);
  }

  const setUserIPPTDate = () => {
    let userDate = new Date(user.birthdate).getUTCDate();
    let userMonth = new Date(user.birthdate).getUTCMonth();
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

    var m = nowTime.getUTCMonth() - userMonth;
    if (m < 0 || (m === 0 && nowTime.getUTCDate() < userDate)) {
      setNextIPPT(`${userDate}/${userMonth}/${todayYear}`)
    } else { setNextIPPT(`${userDate}/${userMonth}/${todayYear + 1}`) }
  }

  const calcScore = async () => {
    try {
      const res = await fetch(`http://52.77.246.182:3000/others/score/?age=${userAge}&pushups=${user.targetAbilities.pushUpCount}&situps=${user.targetAbilities.sitUpCount}&run=${user.targetAbilities.runTimeInSeconds}`);
      const json = await res.json();
      setScoreData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const daysToGo = () => {
    let nextWindowClose = nextIPPT.split('/');
    let windowIppt = new Date(nextWindowClose[2],nextWindowClose[1],nextWindowClose[0]);
    const days = (windowIppt, nowTime) => {
      let difference = windowIppt.getTime() - nowTime.getTime();
      let daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
      setDaysLeft(daysLeft);
    }
    days(windowIppt,nowTime);
  }

  useEffect(() => {
    getNormalEx();
    getRelatedEx();
    getTestLocal();
    getRelLocal();
    setAge()
    calcScore();
    setUserIPPTDate();
  }, []);
  
  useEffect(() => {
    daysToGo();
  },[scoreData])

  let [fontsLoaded] = useFonts({
    'Montserrat': require('../assets/fonts/static/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('../assets/fonts/static/Montserrat-Light.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/static/Montserrat-SemiBold.ttf'),
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
      <View style={globalStyles.banner}>
        <Text style={globalStyles.bannerText}>Training Plan</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.daysToGoContainer}>
          <Text style={styles.daysToGoText}>Welcome {user.username}! You have <Text style={styles.daysToGoTextDays}>{daysLeft}</Text> Days to IPPT {scoreData.result.name}</Text>
          <Pressable onPress={toggleLocalPU}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Test Location: {testLocal.nearestFcc}</Text>
            </View>
          </Pressable>
          {showLocalPU ?
            renderTestLocalPU()
            : null
          }
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

          <View style={styles.setsContainer} >
            {isNormalLoading ? null : <NormalExSet data={dataNormal} set={1} state={exStateId[1]} update={updateStateID} updateNext={updateNextID} nav={navToPoseDetector} />}
            {isNormalLoading ? null : <NormalExSet data={dataNormal} set={2} state={exStateId[2]} update={updateStateID} updateNext={updateNextID} nav={navToPoseDetector} />}
            {isNormalLoading ? null : <NormalExSet data={dataNormal} set={3} state={exStateId[3]} update={updateStateID} updateNext={updateNextID} nav={navToPoseDetector} />}
          </View>
        </View>
        {showRelated ?
          <View style={styles.bonusExercisesContainer}>
            <Text style={styles.bonusExercisesHeaderText}>Bonus Exercises</Text>
            <Text style={styles.relLocationText}>Nearest Gym:</Text>
            <Text style={styles.relLocationText}>{relLocal.nearestGym.split(',')[0]}</Text>
            <View style={styles.setsContainer} >
              {isRelatedLoading ? null : <RelatedExSet data={dataRelated} set={4} state={exStateId[4]} update={updateStateID} updateNext={updateNextID} />}
              {isRelatedLoading ? null : <RelatedExSet data={dataRelated} set={5} state={exStateId[5]} update={updateStateID} updateNext={updateNextID} />}
              {isRelatedLoading ? null : <RelatedExSet data={dataRelated} set={6} state={exStateId[6]} update={updateStateID} updateNext={updateNextID} />}
            </View>
          </View> : null}
      </ScrollView>
    </>
  );
};

export default PlanScreen;
