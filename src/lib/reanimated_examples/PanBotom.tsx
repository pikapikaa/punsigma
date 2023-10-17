import * as React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import BottomSheet from './components/BottomSheet';

interface PanBottomProps {}

const PanBottom = (props: PanBottomProps) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <BottomSheet />
      </View>
    </GestureHandlerRootView>
  );
};

export default PanBottom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
