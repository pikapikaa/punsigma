import * as React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

interface SafeAreawrapProps {
  children: React.ReactNode;
}

const SafeAreawrap = ({children}: SafeAreawrapProps) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeAreawrap;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
