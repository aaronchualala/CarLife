import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {InitUserContext} from './InitNavigatorContext';

function TargetFitnessScreen({navigation}) {
  const {initUserData, setInitUserData} = useContext(InitUserContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>target fitness</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button
        title="Let's Go!"
        onPress={
          () => console.log(initUserData)
          // navigation.navigate('MainNavigator')
        }
      />
    </View>
  );
}

export default TargetFitnessScreen;

// .then(() => {
//   setDoc(doc(db, 'userInfo', auth.currentUser.uid), {
//     uid: auth.currentUser.uid,
//     ...InitData,
//   }).catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage);
//   });
// })
// .then(() => {
//   navigation.navigate('BottomTab');
// })
// .catch(error => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log(errorMessage);
// });
