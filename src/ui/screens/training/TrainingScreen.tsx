import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import Card from '../../components/trainings/Training/Card';
import {topics} from '../../../services/fakeData';
import {useRoute} from '@react-navigation/native';

const TrainingScreen = () => {
  const route = useRoute();
  const id = route?.params?.topicId;
  const topic = topics.find(c => c.id === id);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {topic?.words.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TrainingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
