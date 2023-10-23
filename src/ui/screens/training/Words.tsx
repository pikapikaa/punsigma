import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface WordsProps {}

const Words = (props: WordsProps) => {
  return (
    <View style={styles.container}>
      <Text>Words</Text>
    </View>
  );
};

export default Words;

const styles = StyleSheet.create({
  container: {},
});
