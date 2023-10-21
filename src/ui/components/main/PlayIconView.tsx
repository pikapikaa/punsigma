import * as React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PlayIconViewProps extends ViewProps {
  iconColor?: string;
}

const PlayIconView = ({iconColor = 'black', ...props}: PlayIconViewProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Icon name="play" size={15} color={iconColor} />
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
