import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';

import {track} from '../../../../dummyData';
import MediaPlayer from '../../components/ui/other/MediaPlayer';
import {TrackInterface} from '../../../../dummyData';
import BottomSheetModalWrap from '../../components/layouts/BottomSheetModalWrap';
import PodcastTranslateViewScreen from './PodcastTranslateViewScreen';
import {usePlayMedia} from '../../../application/playMedia';
import {translateWord} from '../../../services/api';
import PodcastTextRowItem from '../../components/podcast/PodcastTextRowItem';
import {removePunctuation} from '../../../lib/util';

interface PodcastDetailViewScreenProps {
  modalRef: React.RefObject<BottomSheetModal>;
}

type FlatListRenderItem = {
  item: TrackInterface;
  index: number;
};

const PodcastDetailViewScreen = ({modalRef}: PodcastDetailViewScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const [currentWord, setCurrentWord] = useState('');
  const [translateText, setTranslateText] = useState('');

  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const {playAndPauseMedia, seekToMedia, getProgress, pauseMedia} =
    usePlayMedia();

  const {position} = getProgress();

  const syncLyric = (time: number) => {
    const scores: number[] = [];
    track.forEach(({progress}) => {
      const score = time - progress;
      if (score >= 0) scores.push(score);
    });

    if (scores.length === 0) return -1;

    const closest = Math.min(...scores);
    return scores.indexOf(closest);
  };

  useEffect(() => {
    const index = syncLyric(position);
    if (index > -1) {
      setCurrentIndex(index);
      flatListRef?.current?.scrollToIndex({
        index,
        viewPosition: 0.5,
      });
    }
  }, [position]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await translateWord(currentWord);
      setTranslateText(result);
    };
    if (isModalVisible && currentWord) {
      fetchData();
    }
  }, [isModalVisible, currentWord]);

  const onTranslateWord = async (word: string) => {
    await pauseMedia();
    const clearWord = removePunctuation(word);
    setCurrentWord(clearWord);
    setModalVisible(true);
  };

  const renderItem = useCallback(
    ({item, index}: FlatListRenderItem) => {
      return (
        <PodcastTextRowItem
          item={item}
          index={index}
          currentIndex={currentIndex}
          onPressSentence={number => seekToMedia(number)}
          onPressWord={onTranslateWord}
        />
      );
    },
    [currentIndex],
  );

  return (
    <>
      <BottomSheetModalWrap modalRef={modalRef}>
        <View style={styles.container}>
          <View style={{paddingHorizontal: 15, paddingTop: 25, flex: 1}}>
            <Text style={styles.title}>if u feeling “Lost”</Text>
            <BottomSheetFlatList
              data={track}
              keyExtractor={({id}) => id.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={{height: 20}} />}
              ref={flatListRef}
              onScrollToIndexFailed={() => {}}
            />
          </View>

          <MediaPlayer onPress={playAndPauseMedia} seekTo={seekToMedia} />
        </View>
      </BottomSheetModalWrap>

      <PodcastTranslateViewScreen
        isVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={currentWord}
        description={translateText}
      />
    </>
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
    fontSize: 30,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: 'grey',
    lineHeight: 30,
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
