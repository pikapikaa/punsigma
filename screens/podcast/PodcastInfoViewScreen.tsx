import React, {useCallback, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import PodcastDetailViewScreen from './PodcastDetailViewScreen';
import TrackPlayer from 'react-native-track-player';

interface PodcastInfoViewScreenProps {}

const URI = 'https://floffi.media/images/Mr-Robot-Elliot-01-600x400.jpg';

const PodcastInfoViewScreen = (props: PodcastInfoViewScreenProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();

    await TrackPlayer.reset();
    await TrackPlayer.add([
      {
        url: require('../../assets/media/podcast.mp3'),
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork:
          'https://compote.slate.com/images/ea417857-5b23-47b9-9380-c1b70b33694f.jpg?crop=1180%2C842%2Cx0%2Cy0&width=1920', // Load artwork from the network
        duration: 402, // Duration in seconds
      },
    ]);
    await TrackPlayer.play();
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#F3F7FC" />
      <ScrollView style={{flex: 1}}>
        <View style={styles.top}>
          <View style={{alignItems: 'center', gap: 15}}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{
                uri: URI,
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
              <Text style={{color: '#C4C4C4'}}>Январь 12, 2019</Text>
              <Text>🇲🇳</Text>
              <Text style={{color: '#C4C4C4'}}>Буриад FM</Text>
            </View>

            <Text style={styles.titleText}>
              Талын нюусанууд. «Буряад үнэн» Хэблэлэй байшанай шэнжэлхы удхатай
              аяншалга
            </Text>
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
            <Pressable style={styles.button} onPress={handlePresentModalPress}>
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
          <Text style={{color: '#C4C4C4'}}>
            Норжима Цыбиковагай Монгол ороной зүүн урда нютагаар аяншалгын
            дүнгөөр бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл. Эхиниинь урдахи
            дугаарта) Норжима Цыбиковагай Монгол ороной зүүн урда нютагаар
            аяншалгын дүнгөөр бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл. Эхиниинь
            урдахи дугаарта) Норжима Цыбиковагай Монгол ороной зүүн урда
            нютагаар аяншалгын дүнгөөр бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл.
            Эхиниинь урдахи дугаарта) Норжима Цыбиковагай Монгол ороной зүүн
            урда нютагаар аяншалгын дүнгөөр бэлдэгдэһэн зураглалнууд.
            (Үргэлжэлэл. Эхиниинь урдахи дугаарта) Норжима Цыбиковагай Монгол
            ороной зүүн урда нютагаар аяншалгын дүнгөөр бэлдэгдэһэн
            зураглалнууд. (Үргэлжэлэл. Эхиниинь урдахи дугаарта) Норжима
            Цыбиковагай Монгол ороной зүүн урда нютагаар аяншалгын дүнгөөр
            бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл. Эхиниинь урдахи дугаарта)
            Норжима Цыбиковагай Монгол ороной зүүн урда нютагаар аяншалгын
            дүнгөөр бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл. Эхиниинь урдахи
            дугаарта) Норжима Цыбиковагай Монгол ороной зүүн урда нютагаар
            аяншалгын дүнгөөр бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл. Эхиниинь
            урдахи дугаарта) Норжима Цыбиковагай Монгол ороной зүүн урда
            нютагаар аяншалгын дүнгөөр бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл.
            Эхиниинь урдахи дугаарта) Норжима Цыбиковагай Монгол ороной зүүн
            урда нютагаар аяншалгын дүнгөөр бэлдэгдэһэн зураглалнууд.
            (Үргэлжэлэл. Эхиниинь урдахи дугаарта) Норжима Цыбиковагай Монгол
            ороной зүүн урда нютагаар аяншалгын дүнгөөр бэлдэгдэһэн
            зураглалнууд. (Үргэлжэлэл. Эхиниинь урдахи дугаарта) Норжима
            Цыбиковагай Монгол ороной зүүн урда нютагаар аяншалгын дүнгөөр
            бэлдэгдэһэн зураглалнууд. (Үргэлжэлэл. Эхиниинь урдахи дугаарта)
          </Text>
        </View>
        <PodcastDetailViewScreen modalRef={bottomSheetModalRef} />
      </ScrollView>
    </View>
  );
};

export default PodcastInfoViewScreen;

const styles = StyleSheet.create({
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
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
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
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
