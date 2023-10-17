import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface PanCircle2Props {}

interface AnimatedPosition {
  x: SharedValue<number>;
  y: SharedValue<number>;
}

const SIZE = 80;

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
  return {followX, followY, rStyle};
};

const PanCircle2 = (props: PanCircle2Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const context = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {
        x: translateX.value,
        y: translateY.value,
      };
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - SIZE;
      } else {
        translateX.value = 0;
      }
    });

  const {
    rStyle: rBlueStyle,
    followX: blueFollowX,
    followY: blueFollowY,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });

  const {
    rStyle: rRedStyle,
    followX: redFollowX,
    followY: redFollowY,
  } = useFollowAnimatedPosition({
    x: blueFollowX,
    y: blueFollowY,
  });

  const {rStyle: rGreenStyle} = useFollowAnimatedPosition({
    x: redFollowX,
    y: redFollowY,
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle, {backgroundColor: 'green'}, rGreenStyle]}
      />
      <Animated.View
        style={[styles.circle, {backgroundColor: 'red'}, rRedStyle]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.circle, rBlueStyle]}></Animated.View>
      </GestureDetector>
    </View>
  );
};

export default PanCircle2;

const styles = StyleSheet.create({
  container: {flex: 1},
  circle: {
    position: 'absolute',
    height: SIZE,
    backgroundColor: 'blue',
    aspectRatio: 1,
    borderRadius: SIZE / 2,
    opacity: 0.8,
  },
});
