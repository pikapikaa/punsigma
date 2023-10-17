import React, {useCallback, useEffect} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  ReduceMotion,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface BottomSheetProps {}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 80;

const BottomSheet = (props: BottomSheetProps) => {
  const translatedY = useSharedValue(0);
  const velocityY = useSharedValue(0);

  const contextY = useSharedValue(0);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translatedY.value = withSpring(destination, {
      damping: 50,
       stiffness: 123,
      // overshootClamping: true,
        //restDisplacementThreshold: 10,
        restSpeedThreshold:  110,
       reduceMotion: ReduceMotion.Always,
    });
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translatedY.value;
    })
    .onUpdate(event => {
      translatedY.value = event.translationY + contextY.value;
      translatedY.value = Math.max(translatedY.value, MAX_TRANSLATE_Y);
      velocityY.value = event.velocityY;
      console.log(event.velocityY, 'event.velocityY');
    })
    .onEnd(() => {
      
      if (
        (translatedY.value > -SCREEN_HEIGHT / 2 && velocityY.value >= 0) ||
        velocityY.value > 150
      ) {
        scrollTo(-100);
      } else if (
        translatedY.value < -SCREEN_HEIGHT / 2 ||
        velocityY.value < 0
      ) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT / 3);
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translatedY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [0, 25],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: translatedY.value}],
      borderRadius,
    };
  });

  // const opacity = interpolate(translateY, {
  //   inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
  //   outputRange: [0, 1],
  //   extrapolate: Extrapolate.CLAMP
  // });

  const lineStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translatedY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rStyle]}>
        <Animated.View style={[styles.line, lineStyle]}></Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});
