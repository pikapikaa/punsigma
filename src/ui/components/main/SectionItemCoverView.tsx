import {SCREEN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

import RemainingTime from './RemainingTimeView';
import PlayIconView from './PlayIconView';

interface SectionItemViewProps {
  item: any;
  showInfo: () => void;
  play?: () => void;
}

const WIDTH_IMAGE = WINDOW_WIDTH / 2 - 20;
const HEIGHT_IMAGE = 250;

const SectionItemCoverView = ({item, showInfo, play}: SectionItemViewProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={{}} onPress={showInfo}>
        <View style={{gap: 10}}>
          <View>
            <Image source={{uri: item.url}} style={styles.image} />
            <PlayIconView
              style={{
                position: 'absolute',
                top: HEIGHT_IMAGE / 2 - 20,
                left: (WIDTH_IMAGE - 20) / 2,
                backgroundColor: `rgba(255, 255, 255, 0.6)`,
              }}
              iconColor="white"
            />
          </View>

          <View
            style={{
              height: 60,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text} numberOfLines={2}>
              {item.text}
            </Text>
            <RemainingTime />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default SectionItemCoverView;

const styles = StyleSheet.create({
  container: {
    width: WIDTH_IMAGE,
    marginStart: 15,
    marginRight: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    borderRadius: 20,
    overflow: 'hidden',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  time: {color: 'grey', fontSize: 14},
});
