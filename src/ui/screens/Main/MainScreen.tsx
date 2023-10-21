import React, {useCallback, useRef, useState} from 'react';
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
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import PodcastDetailViewScreen from '../podcast/PodcastDetailViewScreen';
import {usePlayMedia} from '../../../application/playMedia';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {playMedia} = usePlayMedia();
  const navigation = useNavigation();

  const onShowInfo = useCallback(() => {
    navigation.navigate('PodcastInfoView');
  }, []);

  const onPlay = useCallback(async () => {
    await playMedia(bottomSheetModalRef, podcasts[0]);
  }, []);

  return (
    <SafeAreaWrap>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <MainTitleView />
          <SearchView />
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
      <PodcastDetailViewScreen
        modalRef={bottomSheetModalRef}
        setIsOpen={setIsOpen}
      />
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
