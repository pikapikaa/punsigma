import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {recentlyPodcasts} from '../../../services/fakeData';

interface RecentlyPlayedViewProps {}

const RecentlyPlayedView = (props: RecentlyPlayedViewProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}>
        <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={Math.ceil(recentlyPodcasts.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={recentlyPodcasts}
          ItemSeparatorComponent={<View style={{height: 30}}></View>}
          renderItem={({item, index}) => {
            return (
              <View style={styles.trackContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Pressable
                    style={{width: '60%'}}
                    onPress={() => navigation.navigate('PodcastInfoView')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                      }}>
                      <Image source={{uri: item.url}} style={styles.image} />
                      <View style={{justifyContent: 'center', gap: 10}}>
                        <Text style={styles.text}>{item.text}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 8,
                            alignItems: 'center',
                          }}>
                          <Icon name="time-outline" size={15} color="grey" />
                          <Text style={styles.time}>16 mins remaining</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>

                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40 / 2,
                      backgroundColor: '#c7f4c2',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="play" size={20} color="black" />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default RecentlyPlayedView;

const styles = StyleSheet.create({
  container: {gap: 20},
  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  trackContainer: {
    width: SCREEN_WIDTH - 30,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
    overflow: 'hidden',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  time: {color: 'grey', fontSize: 14},
});
