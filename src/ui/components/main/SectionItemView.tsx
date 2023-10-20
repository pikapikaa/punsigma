import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SectionItemViewProps {
  item: any;
  onPress: () => void;
}

const SectionItemView = ({item, onPress}: SectionItemViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable style={{width: '60%'}} onPress={onPress}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <Image source={{uri: item.url}} style={styles.image} />
            <View style={{justifyContent: 'center', gap: 10}}>
              <Text style={styles.text}>{item.text}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                }}>
                <Icon name="time-outline" size={15} color="grey" />
                <Text style={styles.time}>16 mins remaining</Text>
              </View>
            </View>
          </View>
        </Pressable>

        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            backgroundColor: '#c7f4c2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="play" size={20} color="black" />
        </View>
      </View>
    </View>
  );
};

export default SectionItemView;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
    overflow: 'hidden',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  time: {color: 'grey', fontSize: 14},
});
