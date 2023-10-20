import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PlayIconViewProps {}

const PlayIconView = (props: PlayIconViewProps) => {
  return (
    <View style={styles.container}>
      <Icon name="play" size={20} color="black" />
    </View>
  );
};

export default PlayIconView;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#c7f4c2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
