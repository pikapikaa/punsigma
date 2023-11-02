import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import SafeAreaWrap from '../../components/layouts/SafeAreaWrap';
import MainTitleView from '../../components/main/MainTitleView';
import SearchView from '../../components/main/SearchView';
import FilterScrollView from '../../components/main/FilterScrollView';
import SectionView from '../../components/main/SectionView';
import {podcasts, recentlyPodcasts} from '../../../services/fakeData';
import SectionItemView from '../../components/main/SectionItemView';
import SectionItemCoverView from '../../components/main/SectionItemCoverView';
import PodcastDetailViewScreen from '../podcast/PodcastDetailViewScreen';
import {usePlayMedia} from '../../../application/playMedia';
import {useNavigation} from '@react-navigation/native';
import {usePlayerContext} from '../../../services/contexts/PlayerContext';
import {useModalBackHandler} from '../../../services/hooks/useModalBackHandler';

const MainScreen = () => {
  const {
    playerSheetModalRef,
    open,
    isOpen: isFloatingOpen,
  } = usePlayerContext();
  const {playMedia} = usePlayMedia();
  const navigation = useNavigation();

  useModalBackHandler(
    isFloatingOpen,
    () => playerSheetModalRef.current?.close(),
    () => navigation.goBack(),
  );

  const onShowInfo = useCallback(() => {
    navigation.navigate('PodcastInfoView');
  }, []);

  const onPlay = useCallback(async () => {
    open();
    await playMedia(playerSheetModalRef, podcasts[0]);
  }, []);

  return (
    <SafeAreaWrap>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <MainTitleView />
          <SearchView placeholder="Search any podcast topic" />
          <FilterScrollView />
          <SectionView
            title="Recently Played"
            data={recentlyPodcasts}
            numColumns={Math.ceil(recentlyPodcasts.length / 2)}
            renderItem={({item}) => (
              <SectionItemView
                item={item}
                play={onPlay}
                showInfo={onShowInfo}
              />
            )}
          />

          <SectionView
            title="Trending Podcasts"
            data={recentlyPodcasts}
            numColumns={Math.ceil(recentlyPodcasts.length / 1)}
            renderItem={({item}) => (
              <SectionItemCoverView
                item={item}
                play={onPlay}
                showInfo={onShowInfo}
              />
            )}
          />
        </View>
      </ScrollView>
      <PodcastDetailViewScreen modalRef={playerSheetModalRef} />
    </SafeAreaWrap>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingTop: 20,
  },
});
