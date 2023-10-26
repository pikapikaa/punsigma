import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import {useCardAnimatedTextStyle} from '../../../../services/hooks/useCardAnimatedTextStyle';

interface CardProps {
  card: {name: string; url: string};
  index: number;
}

const {width, height} = Dimensions.get('window');
const aspectRatio = 722 / 500;
const CARD_WIDTH = width - 80;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
const side = (width + CARD_WIDTH + 50) / 2;
const SNAP_POINTS_X = [-side, 0, side];
const side2 = (height + CARD_HEIGHT + 50) / 2;
const SNAP_POINTS_Y = [0, side2];
const offset = (width - CARD_WIDTH) / 2;

const Card = ({card, index}: CardProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(-height);
  const context = useSharedValue({x: 0, y: 0});
  const theta = Math.random() * 20 - 10;
  const scale = useSharedValue(1);
  const yesVisible = useSharedValue(false);
  const noVisible = useSharedValue(false);
  const doubtVisible = useSharedValue(false);

  useEffect(() => {
    const delay = 1000 + index * DURATION;
    y.value = withDelay(
      delay,
      withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    );
  }, [index, y, theta]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {
        x: x.value,
        y: y.value,
      };
      scale.value = withTiming(1.1, {easing: Easing.inOut(Easing.ease)});
    })
    .onUpdate(event => {
      x.value = event.translationX + context.value.x;
      y.value = event.translationY + context.value.y;
      if (x.value < -offset) {
        yesVisible.value = false;
        noVisible.value = true;
        doubtVisible.value = false;
      } else if (x.value >= offset) {
        yesVisible.value = true;
        noVisible.value = false;
        doubtVisible.value = false;
      } else if (y.value > 30) {
        yesVisible.value = false;
        noVisible.value = false;
        doubtVisible.value = true;
      } else {
        yesVisible.value = false;
        noVisible.value = false;
        doubtVisible.value = false;
      }
    })
    .onEnd(event => {
      const destX = snapPoint(x.value, event.velocityX, SNAP_POINTS_X);
      const destY = snapPoint(y.value, event.velocityY, SNAP_POINTS_Y);
      x.value = withSpring(destX, {velocity: event.velocityX});
      y.value = withSpring(destY, {velocity: event.velocityY});
      scale.value = withTiming(1, {easing: Easing.inOut(Easing.ease)});
    })
    .onFinalize(() => {
      yesVisible.value = false;
      noVisible.value = false;
      doubtVisible.value = false;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {scale: scale.value},
      ],
    };
  });

  const {animatedStyle: rYesTextStyle} = useCardAnimatedTextStyle(yesVisible);
  const {animatedStyle: rDoubtTextStyle} =
    useCardAnimatedTextStyle(doubtVisible);
  const {animatedStyle: rNopeTextStyle} = useCardAnimatedTextStyle(noVisible);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, rStyle]}>
          <Animated.View
            style={[
              styles.labelContainer,
              styles.likeContainer,
              rYesTextStyle,
            ]}>
            <Text style={[styles.label, styles.likeText]}>know</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.labelContainer,
              styles.doubtContainer,
              rDoubtTextStyle,
            ]}>
            <Text style={[styles.label, styles.doubtText]}>doubt</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.labelContainer,
              styles.nopeContainer,
              rNopeTextStyle,
            ]}>
            <Text style={[styles.label, styles.nopeText]}>don't know</Text>
          </Animated.View>
          <Image
            source={{uri: card.url}}
            style={[styles.image]}
            resizeMode="cover"
          />
          <Text style={styles.text}>{card.name}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    padding: 15,
    paddingTop: 30,
    justifyContent: 'space-evenly',
  },
  text: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 20,
    color: 'black',
  },
  image: {
    borderRadius: 20,
    overflow: 'hidden',
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    position: 'absolute',
    zIndex: 10,
  },
  likeContainer: {
    borderColor: '#6ee3b4',
  },
  nopeContainer: {
    right: 0,
    borderColor: '#ec5288',
  },
  doubtContainer: {
    left: CARD_WIDTH / 2 - 30,
    borderColor: 'orange',
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'RobotoSlab-Bold',
  },
  nopeText: {
    color: '#ec5288',
  },
  doubtText: {
    color: 'orange',
  },
  likeText: {
    color: '#6ee3b4',
  },
});
