import React, {useCallback} from 'react';
import {View, StyleSheet, ListRenderItem, SafeAreaView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {allTopics} from '../../../services/fakeData';
import {Topic} from '../../../domain/Topic';
import TopicCard from '../../components/trainings/Topic/TopicCard';
import SearchView from '../../components/main/SearchView';
import {useNavigation} from '@react-navigation/native';

const Words = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Training');
  };

  const renderItem: ListRenderItem<Topic> = useCallback(({item}) => {
    return (
      <TopicCard
        topic={item}
        image={<TopicCard.Image />}
        info={<TopicCard.Info />}
        action={<TopicCard.Button onClick={onPress} />}
      />
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fdfbf7'}}>
      <View style={styles.container}>
        <SearchView
          placeholder="Search topics"
          style={{marginHorizontal: 0, backgroundColor: '#f3f2e9'}}
        />
        <FlatList
          data={allTopics}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Words;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    gap: 10,
  },
});
