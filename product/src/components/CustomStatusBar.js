import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {View, Platform} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;

export const CustomStatusBar = () => {
  return <View style={{height: STATUSBAR_HEIGHT}} />;
};
