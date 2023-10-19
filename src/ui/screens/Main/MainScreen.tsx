import React from 'react';
import {View, StyleSheet} from 'react-native';

import SafeAreaWrap from '../../components/layouts/SafeAreaWrap';
import MainTitleView from '../../components/main/MainTitleView';
import SearchView from '../../components/main/SearchView';
import {ScrollView} from 'react-native-gesture-handler';
import FilterScrollView from '../../components/main/FilterScrollView';
import RecentlyPlayedView from '../../components/main/RecentlyPlayedView';

const MainScreen = () => {
  return (
    <SafeAreaWrap>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <MainTitleView />
          <SearchView />
          <FilterScrollView />
          <RecentlyPlayedView />
        </View>
      </ScrollView>
    </SafeAreaWrap>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 30,
  },
});
