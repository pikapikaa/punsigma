import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

import RemainingTime from './RemainingTimeView';
import PlayIconView from './PlayIconView';

interface SectionItemViewProps {
  item: any;
  onPress: () => void;
}

const SectionItemCoverView = ({item, onPress}: SectionItemViewProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={{}} onPress={onPress}>
        <View style={{gap: 10}}>
          <Image source={{uri: item.url}} style={styles.image} />
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
    width: SCREEN_WIDTH / 3,
    marginStart: 15,
    marginRight: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  time: {color: 'grey', fontSize: 14},
});
