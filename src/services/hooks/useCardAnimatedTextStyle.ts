import {
  SharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export const useCardAnimatedTextStyle = (value: SharedValue<boolean>) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: value.value
        ? withTiming(1, {duration: 600})
        : withDelay(300, withTiming(0, {duration: 600})),
    };
  });

  return {animatedStyle};
};
