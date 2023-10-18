import * as React from 'react';
import {Text, View, StyleSheet, Pressable, Platform} from 'react-native';
import {removePunctuation} from '../../../lib/util';

type PodcastTextRightRowItemProps = {
  isHighlighted: boolean;
  text: string;
  progress: number;
  onPressSentence: (d: number) => void;
  onPressWord: (t: string) => void;
};

const PodcastTextRightRowItem = ({
  isHighlighted,
  text,
  progress,
  onPressSentence,
  onPressWord,
}: PodcastTextRightRowItemProps) => {
  return (
    <Pressable style={{width: '90%'}} onPress={() => onPressSentence(progress)}>
      <View
        style={[
          isHighlighted && {
            backgroundColor: '#F3F7FC',
            borderRadius: 10,
          },
        ]}>
        <Text>
          {text.split(' ').map((str, index) => {
            const word = removePunctuation(str);
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
                onPress={() => onPressWord(word)}>
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
  );
};

export default PodcastTextRightRowItem;

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
