import {SCREEN_WIDTH, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface PanExampleProps {}
interface AnimatedPosition {
  x: SharedValue<number>;
  y: SharedValue<number>;
}

const useFollowAnimatedPosition = ({x, y}: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: followX.value}, {translateY: followY.value}],
    };
  });

  return {rStyle, followX, followY};
};

const PanExample = (props: PanExampleProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({x: 0, y: 0});

  const gesure = Gesture.Pan()
    .onStart(() => {
      context.value = {
        x: translateX.value,
        y: translateY.value,
      };
    })
    .onUpdate(event => {
      console.log(event.translationX);
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(event => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - 80;
      } else {
        translateX.value = 0;
      }
    });

  const {
    rStyle: rPurpleStyle,
    followX: purpleFollowX,
    followY: purpleFollowY,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });

  const {
    rStyle: rRedStyle,
    followX: redFollowX,
    followY: redFollowY,
  } = useFollowAnimatedPosition({
    x: purpleFollowX,
    y: purpleFollowY,
  });

  const {
    rStyle: rGreenStyle,
    followX,
    followY,
  } = useFollowAnimatedPosition({
    x: redFollowX,
    y: redFollowY,
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {backgroundColor: 'green'},
          rGreenStyle,
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.circle,
          {backgroundColor: 'red'},
          rRedStyle,
        ]}></Animated.View>
      <GestureDetector gesture={gesure}>
        <Animated.View style={[styles.circle, rPurpleStyle]}></Animated.View>
      </GestureDetector>
    </View>
  );
};

export default PanExample;

const styles = StyleSheet.create({
  container: {flex: 1, },
  circle: {
    height: 80,
    aspectRatio: 1,
    backgroundColor: 'purple',
    borderRadius: 40,
    opacity: 0.8,
    position: 'absolute',
  },
});
