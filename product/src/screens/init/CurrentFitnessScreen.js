import React from 'react';
import {View, Text, Button} from 'react-native';
import * as styles from '../../css/InitScreen.module.css';

function CurrentFitnessScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>current fitness</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button
        title="Next"
        onPress={() => navigation.navigate('TargetFitnessScreen')}
      />
    </View>
  );
}

export default CurrentFitnessScreen;
