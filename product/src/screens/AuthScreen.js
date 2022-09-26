import React, {useState} from 'react';
import {auth} from '../firebase/config';
import {View, Text, Button, TextInput} from 'react-native';
import * as globalStyles from '../css/globals.css';
import * as styles from '../css/InitScreen.module.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
// import {app} from '../firebase/config';
// import {getAuth} from 'firebase/auth';

function AuthScreen({navigation}) {
  const [signUp, setSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.demoClass}>{signUp ? 'Sign Up' : 'Sign In'}</Text>
      <Text />
      <Text>Email</Text>
      <TextInput
        style={globalStyles.textInputClass}
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        style={globalStyles.textInputClass}
        onChangeText={text => setPassword(text)}
        value={password}
        autoCapitalize="none"
      />
      <Button
        title={signUp ? 'Sign Up' : 'Sign In'}
        onPress={() => {
          (signUp
            ? createUserWithEmailAndPassword(auth, email, password)
            : signInWithEmailAndPassword(auth, email, password)
          )
            .then(() => {
              navigation.navigate('InitNavigator');
              // console.log(getAuth(app));
            })
            .catch(error => {
              const errorMessage = error.message;
              console.log(errorMessage);
            });
        }}
      />
      <Text />
      <>
        <Text>
          {signUp ? 'Already have an account?' : "Don't have an account?"}
        </Text>
        <Button
          title={signUp ? 'Sign In' : 'Sign Up'}
          onPress={() => {
            setSignUp(x => !x);
          }}
        />
      </>
    </View>
  );
}

export default AuthScreen;
