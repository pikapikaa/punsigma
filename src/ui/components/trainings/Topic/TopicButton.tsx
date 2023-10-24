import * as React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useTopicContext} from '../../../../services/contexts/TopicCardContext';
import {Topic} from '../../../../domain/Topic';

type TopicButtonProps = {
  onClick: (t: Topic) => void;
};

const TopicButton = ({onClick}: TopicButtonProps) => {
  const {topic} = useTopicContext();

  const handleClick = () => {
    onClick(topic);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          height: 35,
          backgroundColor: '#7a88fb',
          flex: 1,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleClick}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontFamily: 'RobotoSlab-Bold',
            }}>
            Learn
          </Text>
        </View>
      </Pressable>

      <View
        style={{
          height: 35,
          borderWidth: 1,
          borderColor: '#7a88fb',
          flex: 1,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#7a88fb',
            fontSize: 15,
            fontFamily: 'RobotoSlab-Bold',
          }}>
          Info
        </Text>
      </View>
    </View>
  );
};

export default TopicButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});
