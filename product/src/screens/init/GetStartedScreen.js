import React from 'react';
import {View, Text, Button} from 'react-native';
import * as styles from '../../css/InitScreen.module.css';

function GetStartedScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.demoClass}>Welcome</Text>
      <Button
        title="Get Started"
        onPress={() => {
          navigation.navigate('PersonalDetailsScreen');
        }}
      />
    </View>
  );
}

export default GetStartedScreen;
