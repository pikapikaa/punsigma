import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import React, {ReactNode} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import TopicCardContext from '../../../../services/contexts/TopicCardContext';
import {Topic} from '../../../../domain/Topic';
import TopicImage from './TopicImage';
import TopicInfo from './TopicInfo';
import TopicButton from './TopicButton';

type TopicCardProps = {
  topic: Topic;
  image?: ReactNode;
  info?: ReactNode;
  action?: ReactNode;
};

const TopicCard = ({image, info, action, topic}: TopicCardProps) => {
  return (
    <TopicCardContext.Provider value={{topic}}>
      <View style={styles.container}>
        {image}
        {info}
        {action}
      </View>
    </TopicCardContext.Provider>
  );
};

TopicCard.Image = TopicImage;
TopicCard.Info = TopicInfo;
TopicCard.Button = TopicButton;

export default TopicCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: SCREEN_HEIGHT / 4,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: Platform.OS === 'ios' ? 'white' : undefined,
    gap: 10,
    justifyContent: 'space-between',
  },
});
