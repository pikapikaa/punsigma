import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@gorhom/bottom-sheet';
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

interface PanExample2Props {
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
const SNAP_POINTS = [-side, 0, side];

const PanExample2 = ({card, index}: PanExample2Props) => {
  const x = useSharedValue(0);
  const y = useSharedValue(-height);
  const context = useSharedValue({x: 0, y: 0});
  const theta = Math.random() * 20 - 10;
  //const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const delay = 1000 + index * DURATION;
    y.value = withDelay(
      delay,
      withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    );
    // rotateZ.value = withDelay(
    //   delay,
    //   withTiming(theta, {
    //     duration: DURATION,
    //     easing: Easing.inOut(Easing.ease),
    //   }),
    // );
  }, [index, y, theta]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {
        x: x.value,
        y: y.value,
      };
      scale.value = withTiming(1.1, {easing: Easing.inOut(Easing.ease)});
      // rotateZ.value = withTiming(0, {easing: Easing.inOut(Easing.ease)});
    })
    .onUpdate(event => {
      x.value = event.translationX + context.value.x;
      y.value = event.translationY + context.value.y;
    })
    .onEnd(event => {
      const dest = snapPoint(x.value, event.velocityX, SNAP_POINTS);
      x.value = withSpring(dest, {velocity: event.velocityX});
      y.value = withSpring(0, {velocity: event.velocityY});
      scale.value = withTiming(1, {easing: Easing.inOut(Easing.ease)});
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {perspective: 1500},

        {translateX: x.value},
        {translateY: y.value},
        // {rotateX: '30deg'},
        // {rotateY: `${rotateZ.value / 10}deg`},
        // {rotateZ: `${rotateZ.value}deg`},
        {scale: scale.value},
      ],
    };
  });

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, rStyle]}>
          <Image
            source={{uri: card.url}}
            style={[styles.image, {width: IMAGE_WIDTH, height: IMAGE_WIDTH}]}
            resizeMode="cover"
          />
          <Text style={styles.text}>{card.name}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default PanExample2;

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
    alignItems: 'center',
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
  },
});
