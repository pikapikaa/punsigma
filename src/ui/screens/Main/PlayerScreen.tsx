import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface PlayerScreenProps {}

const PlayerScreen = (props: PlayerScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>PlayerScreen</Text>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {},
});
