import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import PodcastDetailViewScreen from './PodcastDetailViewScreen';

import {usePlayMedia} from '../../../application/playMedia';
import {podcasts} from '../../../services/fakeData';
import {formateDate, parseStrToDate2} from '../../../lib/datetime';
import {useModalBackHandler} from '../../../services/hooks/useModalBackHandler';

const PodcastInfoViewScreen = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {playMedia} = usePlayMedia();
  const podcast = podcasts[0];

  useModalBackHandler(
    isOpen,
    () => bottomSheetModalRef.current?.close(),
    () => navigation.goBack(),
  );

  const handlePresentModalPress = useCallback(async () => {
    await playMedia(bottomSheetModalRef, podcasts[0]);
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.top}>
            <View style={{alignItems: 'center', gap: 15}}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                  uri: podcasts[0].artwork?.toString(),
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  gap: 10,
                }}>
                <IconEntypo name="progress-two" size={20} color="#F9BE66" />
                <Text style={{color: '#C4C4C4'}}>
                  {formateDate(parseStrToDate2(podcast.date))}
                </Text>
                <Text>🇲🇳</Text>
                <Text style={{color: '#C4C4C4'}}>{podcasts[0].album}</Text>
              </View>

              <Text style={styles.titleText}>{podcasts[0].title}</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View style={{justifyContent: 'flex-end'}}>
                <Icon name="download-outline" size={20} color="#4E67BF" />
              </View>
              <Pressable
                style={styles.button}
                onPress={handlePresentModalPress}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Icon name="play" size={20} color="#FDFEFD" />
                  <Text style={styles.buttonText}>Play podcast</Text>
                </View>
              </Pressable>
              <View style={{justifyContent: 'flex-end'}}>
                <Icon name="heart-outline" size={20} color="#4E67BF" />
              </View>
            </View>
          </View>

          <View style={styles.bottom}>
            <Text>{podcast.description}</Text>
          </View>

          <PodcastDetailViewScreen modalRef={bottomSheetModalRef} />
        </ScrollView>
      </View>
    </>
  );
};

export default PodcastInfoViewScreen;

const styles = StyleSheet.create({
  scrollView: {flex: 1, backgroundColor: 'white'},
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    gap: 15,
    backgroundColor: '#F3F7FC',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  bottom: {
    padding: 15,
    flex: 1,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '70%',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#3CBA5F',
  },
  buttonText: {
    color: '#FDFEFD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'RobotoSlab-Regular',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
