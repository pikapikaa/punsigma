import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {TrackInterface} from '../../../../dummyData';
import PodcastTextRightRowItem from './PodcastTextRightRowItem';

export interface PodcastTextRowItemProps {
  item: TrackInterface;
  index: number;
  currentIndex: number;
  onPressWord: (s: string) => void;
  onPressSentence: (n: number) => void;
}

const PodcastTextRowItem = memo(
  ({
    item,
    index,
    currentIndex,
    onPressWord,
    onPressSentence,
  }: PodcastTextRowItemProps) => {
    const {text, progress} = item;
    const isHighlighted = index === currentIndex;

    return (
      <View style={styles.container}>
        <PodcastTextRightRowItem
          text={text}
          progress={progress}
          isHighlighted={isHighlighted}
          onPressWord={onPressWord}
          onPressSentence={onPressSentence}
        />

        <View style={{width: 'auto'}}>
          <Icon name="chatbubble-ellipses-outline" size={20} color="#4E67BF" />
        </View>
      </View>
    );
  },
);

export default PodcastTextRowItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
