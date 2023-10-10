import React, {useCallback, useMemo, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  NativeEventEmitter,
  Platform,
} from 'react-native';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import BackgroundTimer from 'react-native-background-timer';

import {track} from '../../dummyData';
import MediaPlayer from '../../components/ui/other/MediaPlayer';
import {TrackInterface} from '../../dummyData';
import MediaModule from '../../components/nativeModules/MediaModule';

interface PodcastDetailViewScreenProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}

const PodcastDetailViewScreen = ({modalRef}: PodcastDetailViewScreenProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(0);
  const [lastHiglighted, setLastHiglighted] = useState<TrackInterface | null>(
    null,
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout | number;

    if (isRunning) {
      intervalId = BackgroundTimer.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }

    const durationMs = Math.floor(duration / 1000);
    if (durationMs && durationMs === time) {
      BackgroundTimer.clearInterval(intervalId);
      setIsRunning(false);
      setTime(0);
    }

    const item = track.find(el => el.progress === time);
    if (item) setLastHiglighted(item);

    return () => {
      BackgroundTimer.clearInterval(intervalId);
    };
  }, [isRunning, time, duration]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const eventEmitter = new NativeEventEmitter();
      let eventListener = eventEmitter.addListener('eventDuration', event => {
        setDuration(event.duration);
      });
      return () => {
        eventListener.remove();
      };
    }
  }, []);

  const snapPoints = useMemo(() => ['10%', '95%'], []);

  const startAndStop = () => {
    setIsRunning(prev => !prev);
    if (isRunning) MediaModule.pauseSound();
    else
      MediaModule.playSound(
        'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3',
      );
  };

  const seekTo = (t: number) => {
    setTime(t);
    MediaModule.seekTo(t * 1000);
  };

  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: TrackInterface}) => {
      const {text, id, progress} = item;
      const isHighlighted = id === lastHiglighted?.id;
      return (
        <Pressable onPress={() => seekTo(progress)}>
          <Text style={[styles.text, isHighlighted && styles.highligthText]}>
            {text}
          </Text>
        </Pressable>
      );
    },
    [time, lastHiglighted],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose>
      <View style={styles.container}>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <Text style={styles.title}>if u feeling “Lost”</Text>
          <BottomSheetFlatList
            data={track}
            keyExtractor={({id}) => id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
          />
        </View>

        <MediaPlayer
          onPress={startAndStop}
          isPlay={isRunning}
          duration={duration}
          progress={time}
          seekTo={seekTo}
        />
      </View>
    </BottomSheetModal>
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
