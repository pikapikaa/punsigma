import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface WordsProps {}

const Words = (props: WordsProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Words</Text>
      </View>
    </SafeAreaView>
  );
};

export default Words;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
});
