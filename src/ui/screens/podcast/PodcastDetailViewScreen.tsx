import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Pressable, Platform} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

import {track} from '../../../../dummyData';
import MediaPlayer from '../../components/ui/other/MediaPlayer';
import {TrackInterface} from '../../../../dummyData';
import BottomSheetModalWrap from '../../components/layouts/BottomSheetModalWrap';
import PodcastTranslateViewScreen from './PodcastTranslateViewScreen';
import {usePlayMedia} from '../../../application/playMedia';
import {translateWord} from '../../../services/api';

interface PodcastDetailViewScreenProps {
  modalRef: React.RefObject<BottomSheetModal>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type FlatListRenderItem = {
  item: TrackInterface;
  index: number;
};

const PodcastDetailViewScreen = ({
  modalRef,
  setIsOpen,
}: PodcastDetailViewScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentWord, setCurrentWord] = useState('');
  const [translateText, setTranslateText] = useState('');

  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const {playAndPauseMedia, seekToMedia, getProgress, pauseMedia} =
    usePlayMedia();

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

      const onTranslateWord = async (word: string) => {
        await pauseMedia();
        //const resultWord = await translateWord(word);
        setCurrentWord(word);
        //setTranslateText(resultWord);
        setModalVisible(true);
      };
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <Pressable
            style={{width: '90%'}}
            onPress={() => seekToMedia(progress)}>
            <View
              style={[
                isHighlighted && {
                  backgroundColor: '#F3F7FC',
                  borderRadius: 10,
                },
              ]}>
              <Text>
                {text.split(' ').map((str, index) => {
                  return (
                    <Pressable
                      android_ripple={{color: 'blue'}}
                      key={index}
                      style={({pressed}) => [
                        {
                          backgroundColor:
                            pressed && Platform.OS === 'ios'
                              ? 'blue'
                              : undefined,
                        },
                        {
                          opacity: pressed && Platform.OS === 'ios' ? 0.5 : 1,
                        },
                      ]}
                      onPress={() => onTranslateWord(str)}>
                      <Text
                        style={[
                          styles.text,
                          isHighlighted && {
                            fontWeight: 'bold',
                            color: 'black',
                          },
                        ]}>
                        {`${str}${index !== text.split(' ').lenght - 1 && ' '}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </Text>
            </View>
          </Pressable>

          <View style={{width: 'auto'}}>
            <Icon
              name="chatbubble-ellipses-outline"
              size={20}
              color="#4E67BF"
            />
          </View>
        </View>
      );
    },
    [currentIndex],
  );

  return (
    <>
      <BottomSheetModalWrap modalRef={modalRef} setIsOpen={setIsOpen}>
        <View style={styles.container}>
          <View style={{paddingHorizontal: 15, paddingTop: 25, flex: 1}}>
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

      <PodcastTranslateViewScreen
        isVisible={modalVisible}
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
