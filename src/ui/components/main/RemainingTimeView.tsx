import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RemainingTimeProps {}

const RemainingTime = (props: RemainingTimeProps) => {
  return (
    <View style={styles.container}>
      <Icon name="time-outline" size={15} color="grey" />
      <Text style={styles.time}>16 mins remaining</Text>
    </View>
  );
};

export default RemainingTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  time: {color: 'grey', fontSize: 14, fontFamily: 'RobotoSlab-Thin'},
});
