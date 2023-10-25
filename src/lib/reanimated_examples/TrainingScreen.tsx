import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import Card from './Card';

interface TrainingScreenProps {}

const TrainingScreen = (props: TrainingScreenProps) => {
  const cards = [
    {
      id: 23,
      name: 'Хайр',
      url: 'https://opis-cdn.tinkoffjournal.ru/mercury/main-best-dorama-ever.sq0cehcv77rp..jpg',
    },
    {
      id: 232,
      name: 'Сайхан',
      url: 'https://kuban24.tv/wp-content/uploads/2023/04/photo_2023-04-14_18-48-45-800x480.jpg',
    },
    {
      id: 233242,
      name: 'Сайхан',
      url: 'https://kuban24.tv/wp-content/uploads/2023/04/photo_2023-04-14_18-48-45-800x480.jpg',
    },
    {
      id: 1,
      name: 'Хайр',
      url: 'https://opis-cdn.tinkoffjournal.ru/mercury/main-best-dorama-ever.sq0cehcv77rp..jpg',
    },
    {
      id: 2,
      name: 'Сайхан',
      url: 'https://cdn.kanobu.ru/editor/images/98/a2903b33-88ee-449d-9cb1-665dc42e1e54.webp',
    },
    {
      id: 3,
      name: 'Сайхан',
      url: 'https://cdn.kanobu.ru/editor/images/98/a2903b33-88ee-449d-9cb1-665dc42e1e54.webp',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {cards.map((card, index) => (
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
