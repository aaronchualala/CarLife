import {useState, useEffect} from 'react';
import {getDoc, doc} from 'firebase/firestore';
import {Text, View} from 'react-native';
import * as styles from '../css/PlanScreen.module.css';
import {app, auth, db} from '../firebase/config';

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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Plan!</Text>
      <Text>{email}</Text>
    </View>
  );
};

export default PlanScreen;
