import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  SharedValue,
} from 'react-native-reanimated';

interface StartProps {}

const {height} = Dimensions.get('window');
const TABBAR_HEIGHT = 34;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;
const SIZE = 100;

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

const handleRoation = (progress: SharedValue<number>) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

const Start = (props: StartProps) => {
  const {top} = useSafeAreaInsets();
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{scale: scale.value}, {rotate: handleRoation(progress)}],
      borderRadius: (progress.value * SIZE) / 2,
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withTiming(0.5), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
  }, []);

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <Animated.View
        style={[
          {
            height: SIZE,
            width: SIZE,
            backgroundColor: 'blue',
          },
          reanimatedStyle,
        ]}></Animated.View>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
