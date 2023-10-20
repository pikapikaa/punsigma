import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import SafeAreaWrap from '../../components/layouts/SafeAreaWrap';
import MainTitleView from '../../components/main/MainTitleView';
import SearchView from '../../components/main/SearchView';
import FilterScrollView from '../../components/main/FilterScrollView';
import SectionView from '../../components/main/SectionView';
import {recentlyPodcasts} from '../../../services/fakeData';
import SectionItemView from '../../components/main/SectionItemView';
import SectionItemCoverView from '../../components/main/SectionItemCoverView';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();
  function onPressPodcast() {
    navigation.navigate('PodcastInfoView');
  }

  return (
    <SafeAreaWrap>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <MainTitleView />
          <SearchView />
          <FilterScrollView />
          <SectionView
            title="Trending Podcasts"
            data={recentlyPodcasts}
            numColumns={Math.ceil(recentlyPodcasts.length / 2)}
            renderItem={({item}) => (
              <SectionItemView item={item} onPress={onPressPodcast} />
            )}
          />

          <SectionView
            title="Trending Podcasts"
            data={recentlyPodcasts}
            numColumns={Math.ceil(recentlyPodcasts.length / 1)}
            renderItem={({item}) => (
              <SectionItemCoverView item={item} onPress={onPressPodcast} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaWrap>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
});
