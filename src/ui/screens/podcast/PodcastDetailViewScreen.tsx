import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';

import MediaPlayer from '../../components/ui/other/MediaPlayer';
import BottomSheetModalWrap from '../../components/layouts/BottomSheetModalWrap';
import PodcastTranslateViewScreen from './PodcastTranslateViewScreen';
import {usePlayMedia} from '../../../application/playMedia';
import PodcastTextRowItem from '../../components/podcast/PodcastTextRowItem';
import {Subtitle} from '../../../domain/SubtitleData';
import {Podcast} from '../../../domain/Podcast';

interface PodcastDetailViewScreenProps {
  modalRef: React.RefObject<BottomSheetModal>;
}

type FlatListRenderItem = {
  item: Subtitle;
  index: number;
};

const PodcastDetailViewScreen = ({modalRef}: PodcastDetailViewScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [currentPodcast, setCurrentPodcast] = useState<Podcast>();

  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const {
    playAndPauseMedia,
    seekToMedia,
    getProgress,
    pauseMedia,
    getPodcastData,
  } = usePlayMedia();

  const {position} = getProgress();
  const currentIndex = syncLyric(position);

  useEffect(() => {
    if (currentIndex > 0) {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex,
        viewPosition: 0.5,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    async function fetchData() {
      const result = await getPodcastData();
      if (result) setCurrentPodcast(result);
    }
    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  function syncLyric(currentPos: number) {
    const scores: number[] = [];
    currentPodcast?.subtitleData.forEach(({time}) => {
      const score = currentPos - time;
      if (score >= 0) scores.push(score);
    });

    if (scores.length === 0) return -1;

    const closest = Math.min(...scores);
    return scores.indexOf(closest);
  }

  const onPlay = () => {
    if (currentPodcast?.duration && position >= currentPodcast?.duration) {
      seekToMedia(0);
    }
    playAndPauseMedia();
  };

  const onTranslateWord = async (word: string) => {
    await pauseMedia();
    setCurrentWord(word);
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

  const closeTranslateModal = async () => {
    setModalVisible(false);
  };

  return (
    <>
      <BottomSheetModalWrap modalRef={modalRef} setModalVisible={setIsVisible}>
        <View style={styles.container}>
          <View style={{paddingHorizontal: 15, paddingTop: 25, flex: 1}}>
            <Text style={styles.title}>{currentPodcast?.title}</Text>
            <BottomSheetFlatList
              data={currentPodcast?.subtitleData}
              keyExtractor={({id}) => id.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={{height: 20}} />}
              ref={flatListRef}
              onScrollToIndexFailed={() => {}}
            />
          </View>

          <MediaPlayer onPress={onPlay} seekTo={seekToMedia} />
        </View>
      </BottomSheetModalWrap>

      {isModalVisible && (
        <PodcastTranslateViewScreen
          isVisible={isModalVisible}
          onBackdropPress={closeTranslateModal}
          text={currentWord}
        />
      )}
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
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontSize: 30,
    marginBottom: 15,
  },
});
