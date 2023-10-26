import {SCREEN_WIDTH, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface PanExample3Props {}

const SIZE = 100;
const SIZE_CLOSE = 50;
const closeIconCenter = {x: 50 - WINDOW_WIDTH / 2, y: 15};

const PanExample3 = (props: PanExample3Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isBallPressed = useSharedValue(false);
  const context = useSharedValue({x: 0, y: 0});
  const scaleBall = useSharedValue(1);
  const ballOpacity = useDerivedValue(() => {
    if (
      translateY.value > closeIconCenter.y - 55 &&
      translateX.value < closeIconCenter.x + 55 &&
      translateX.value > closeIconCenter.x - 55
    ) {
      return withTiming(0.5);
    } else {
      return withTiming(1);
    }
  });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      isBallPressed.value = true;
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
      console.log('X: ', translateX.value, ', Y: ', translateY.value);
      if (
        translateY.value > closeIconCenter.y - 35 &&
        translateX.value < closeIconCenter.x + 35 &&
        translateX.value > closeIconCenter.x - 35
      ) {
        scaleBall.value = withSpring(0.5);
      } else {
        scaleBall.value = withSpring(1);
      }
    })
    .onFinalize(() => {
      isBallPressed.value = false;
      if (
        translateY.value > closeIconCenter.y - 55 &&
        translateX.value < closeIconCenter.x + 55 &&
        translateX.value > closeIconCenter.x - 55
      ) {
        translateX.value = withTiming(closeIconCenter.x);
        translateY.value = withTiming(closeIconCenter.y);
        translateX.value = withDelay(400, withSpring(0));
        translateY.value = withDelay(300, withSpring(closeIconCenter.y + 90));
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scaleBall.value},
      ],
      opacity: ballOpacity.value,
    };
  });
  const rCloseStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: withSpring(isBallPressed.value ? 1.2 : 1)},
        {
          translateY: isBallPressed.value
            ? withSpring(0)
            : withDelay(300, withSpring(65)),
        },
      ],
      opacity: isBallPressed.value
        ? withTiming(1)
        : withDelay(300, withTiming(0)),
    };
  });
  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, rStyle]}></Animated.View>
      </GestureDetector>
      <Animated.View style={[styles.closeContainer, rCloseStyle]}>
        <Text style={{color: 'white'}}>{50 - WINDOW_WIDTH / 2}</Text>
        <Text style={{color: 'white'}}>{-WINDOW_WIDTH / 2}</Text>
      </Animated.View>
    </View>
  );
};

export default PanExample3;

const styles = StyleSheet.create({
  container: {flex: 1},
  ball: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  closeContainer: {
    width: SIZE_CLOSE,
    height: SIZE_CLOSE,
    borderRadius: SIZE_CLOSE / 2,
    backgroundColor: 'purple',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
