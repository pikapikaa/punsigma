import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

import RemainingTime from './RemainingTimeView';
import PlayIconView from './PlayIconView';

interface SectionItemViewProps {
  item: any;
  showInfo: () => void;
  play: () => void;
}

const SectionItemView = ({item, play, showInfo}: SectionItemViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={showInfo} style={{width: '60%'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Image source={{uri: item.url}} style={styles.image} />
              <View style={{justifyContent: 'center', gap: 10}}>
                <Text style={styles.text}>{item.text}</Text>
                <RemainingTime />
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={play}>
          <PlayIconView />
        </Pressable>
      </View>
    </View>
  );
};

export default SectionItemView;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 30,
    marginStart: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
    overflow: 'hidden',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  time: {color: 'grey', fontSize: 14},
});
