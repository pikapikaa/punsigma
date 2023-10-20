import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

import RemainingTime from './RemainingTimeView';
import PlayIconView from './PlayIconView';

interface SectionItemViewProps {
  item: any;
  onPress: () => void;
}

const SectionItemView = ({item, onPress}: SectionItemViewProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.row}>
          <View style={{width: '60%'}}>
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

          <PlayIconView />
        </View>
      </Pressable>
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