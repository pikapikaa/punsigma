import React, {memo} from 'react';
import {Text, View, StyleSheet, Pressable, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {TrackInterface} from '../../../../dummyData';

export interface PodcastTextRowItemProps {
  item: TrackInterface;
  index: number;
  currentIndex: number;
  onPressWord: (s: string) => void;
  onPressSentence: (n: number) => void;
}

const PodcastTextRowItem = memo(
  ({
    item,
    index,
    currentIndex,
    onPressWord,
    onPressSentence,
  }: PodcastTextRowItemProps) => {
    const {text, progress} = item;
    const isHighlighted = index === currentIndex;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}>
        <Pressable
          style={{width: '90%'}}
          onPress={() => onPressSentence(progress)}>
          <View
            style={[
              isHighlighted && {
                backgroundColor: '#F3F7FC',
                borderRadius: 10,
              },
            ]}>
            <Text>
              {text.split(' ').map((str, index) => {
                return (
                  <Pressable
                    android_ripple={{color: 'blue'}}
                    key={index}
                    style={({pressed}) => [
                      {
                        backgroundColor:
                          pressed && Platform.OS === 'ios' ? 'blue' : undefined,
                      },
                      {
                        opacity: pressed && Platform.OS === 'ios' ? 0.5 : 1,
                      },
                    ]}
                    onPress={() => onPressWord(str)}>
                    <Text
                      style={[
                        styles.text,
                        isHighlighted && {
                          fontWeight: 'bold',
                          color: 'black',
                        },
                      ]}>
                      {`${str}${index !== text.split(' ').lenght - 1 && ' '}`}
                    </Text>
                  </Pressable>
                );
              })}
            </Text>
          </View>
        </Pressable>

        <View style={{width: 'auto'}}>
          <Icon name="chatbubble-ellipses-outline" size={20} color="#4E67BF" />
        </View>
      </View>
    );
  },
);

export default PodcastTextRowItem;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'grey',
    lineHeight: 30,
  },
  highligthText: {
    backgroundColor: '#F3F7FC',
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#304054',
  },
});
