import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';

interface FilterScrollViewProps {}

const FilterScrollView = (props: FilterScrollViewProps) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={['All', 'Trending', 'Popular', 'New', 'Live']}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item, index}) => {
        return (
          <View
            style={[
              styles.container,
              index === 0
                ? {backgroundColor: '#bfb5ff'}
                : {backgroundColor: '#f3f2e9'},
            ]}>
            <Text style={styles.text}>{item}</Text>
          </View>
        );
      }}
    />
  );
};

export default FilterScrollView;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 20,
    marginEnd: 10,
    overflow: 'hidden',
    marginStart: 15,
  },
  text: {color: '#7d7a6f'},
});
