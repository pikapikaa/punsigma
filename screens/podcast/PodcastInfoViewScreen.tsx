import React, {useCallback, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import PodcastDetailViewScreen from './PodcastDetailViewScreen';

import {usePlayMedia} from '../../src/application/playMedia';

interface PodcastInfoViewScreenProps {}

const URI = 'https://floffi.media/images/Mr-Robot-Elliot-01-600x400.jpg';

const PodcastInfoViewScreen = (props: PodcastInfoViewScreenProps) => {
  const fixedString = `I'm a fixed string that slipleted. I'm a fixed string that slipleted. I'm a fixed string that slipleted. I'm a fixed string that slipleted. I'm a fixed string that slipleted. I'm a fixed string that slipleted. I'm a fixed string that slipleted. I'm a fixed string that slipleted. I'm a fixed string that slipleted.`;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {addMedia, playAndPauseMedia, resetMedia} = usePlayMedia();

  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();

    await resetMedia();
    await addMedia({
      url: `https://drive.google.com/u/0/uc?id=1dZvOLzqIyrXZmr6yNtl0-1gOo0aZ0XLu&export=download`,
      title: 'Avaritia',
      artist: 'deadmau5',
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      date: '2014-05-20T07:00:00+00:00', // RFC 3339
      artwork:
        'https://compote.slate.com/images/ea417857-5b23-47b9-9380-c1b70b33694f.jpg?crop=1180%2C842%2Cx0%2Cy0&width=1920', // Load artwork from the network
      duration: 402, // Duration in seconds
    });
    await playAndPauseMedia();
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

        <View
          style={[
            {
              backgroundColor: 'grey',
              margin: 10,
              borderRadius: 10,
              padding: 5,
            },
          ]}>
          <Pressable
            style={{backgroundColor: 'red'}}
            onPress={() => Alert.alert('pressss')}>
            <View>
              <Text>
                {fixedString.split(' ').map((str, index) => {
                  return (
                    <Text
                      style={{
                        color: 'black',
                        paddingRight: 10,
                        fontSize: 17,
                        lineHeight: 32,
                      }}
                      key={index}
                      onLongPress={() => Alert.alert(str)}>
                      {`${str}${
                        index !== fixedString.split(' ').lenght - 1 && ' '
                      }`}
                    </Text>
                  );
                })}
              </Text>
            </View>
          </Pressable>
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
