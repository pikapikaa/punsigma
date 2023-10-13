import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useSharedValue} from 'react-native-reanimated';

interface BottomProps {}

const {height} = Dimensions.get('window');
const TABBAR_HEIGHT = 34;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

const Bottom = (props: BottomProps) => {
  const translationY = useSharedValue(0);
  const velocity = useSharedValue(0);
  const state = useSharedValue(State.UNDETERMINED);
  

  const translateY = SNAP_TOP;

  return (
    <PanGestureHandler>
      <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
        <Text>Bottom</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'pink',
  },
});
