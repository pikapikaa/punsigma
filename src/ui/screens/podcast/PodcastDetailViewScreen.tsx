import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';

import {track} from '../../../../dummyData';
import MediaPlayer from '../../components/ui/other/MediaPlayer';
import {TrackInterface} from '../../../../dummyData';
import BottomSheetModalWrap from '../../components/layouts/BottomSheetModalWrap';
import {usePlayMedia} from '../../../application/playMedia';

interface PodcastDetailViewScreenProps {
  modalRef: React.RefObject<BottomSheetModal>;
}

type FlatListRenderItem = {
  item: TrackInterface;
  index: number;
};

const PodcastDetailViewScreen = ({modalRef}: PodcastDetailViewScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);
  const {playAndPauseMedia, seekToMedia, getProgress} = usePlayMedia();

  const {position} = getProgress();

  useEffect(() => {
    const index = track.findIndex(el => el.progress === Math.floor(position));
    if (index > -1) {
      setCurrentIndex(index);
      flatListRef?.current?.scrollToIndex({
        index,
        viewPosition: 0.5,
      });
    }
  }, [position]);

  const renderItem = useCallback(
    ({item, index}: FlatListRenderItem) => {
      const {text, progress} = item;
      const isHighlighted = index === currentIndex;
      return (
        <Pressable onPress={() => seekToMedia(progress)}>
          <Text style={[styles.text, isHighlighted && styles.highligthText]}>
            {text}
          </Text>
        </Pressable>
      );
    },
    [currentIndex],
  );

  return (
    <BottomSheetModalWrap modalRef={modalRef}>
      <View style={styles.container}>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <Text style={styles.title}>if u feeling “Lost”</Text>
          <BottomSheetFlatList
            data={track}
            keyExtractor={({id}) => id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            ref={flatListRef}
          />
        </View>

        <MediaPlayer onPress={playAndPauseMedia} seekTo={seekToMedia} />
      </View>
    </BottomSheetModalWrap>
  );
};

export default PodcastDetailViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    color: 'black',
    lineHeight: 30,
    padding: 5,
  },
  highligthText: {
    backgroundColor: '#F3F7FC',
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#304054',
  },
});
