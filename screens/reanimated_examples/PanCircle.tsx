import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;
interface PanCircleProps {}

type IContext = {
  translateX: number;
  translateY: number;
};

const PanCircle = (props: PanCircleProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    IContext
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={[styles.circle]}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.square, rStyle]}></Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default PanCircle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0,0,256,0.5)',
  },
});
