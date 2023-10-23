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
import {translateWord} from '../../../services/api';
import PodcastTextRowItem from '../../components/podcast/PodcastTextRowItem';
import {removePunctuation} from '../../../lib/util';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [translateText, setTranslateText] = useState('');
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

  useEffect(() => {
    async function fetchData() {
      const result = await getPodcastData();
      if (result) setCurrentPodcast(result);
    }
    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  const syncLyric = (currentPos: number) => {
    const scores: number[] = [];
    currentPodcast?.subtitleData.forEach(({time}) => {
      const score = currentPos - time;
      if (score >= 0) scores.push(score);
    });

    if (scores.length === 0) return -1;

    const closest = Math.min(...scores);
    return scores.indexOf(closest);
  };

  const onPlay = () => {
    if (position >= currentPodcast?.duration) {
      seekToMedia(0);
    }
    playAndPauseMedia();
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
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontSize: 30,
    marginBottom: 15,
  },
});
