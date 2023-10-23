import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useTopicContext} from '../../../../services/contexts/TopicCardContext';

const TopicImage = () => {
  const {topic} = useTopicContext();
  return (
    <View style={styles.container}>
      <Image
        source={{uri: topic.url}}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default TopicImage;

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
