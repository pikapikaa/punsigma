import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useTopicContext} from '../../../../services/contexts/TopicCardContext';

const TopicInfo = () => {
  const {topic} = useTopicContext();
  return <Text style={styles.title}>{topic.title}</Text>;
};

export default TopicInfo;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 16,
  },
});
