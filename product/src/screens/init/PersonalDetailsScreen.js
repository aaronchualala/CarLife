import React from 'react';
import {View, Text, Button} from 'react-native';
import * as styles from '../../css/InitScreen.module.css';

function PersonalDetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>What do we call you?</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate('CurrentFitnessScreen')}
      />
    </View>
  );
}

export default PersonalDetailsScreen;
