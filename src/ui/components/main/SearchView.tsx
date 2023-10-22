import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchViewProps {}

const SearchView = (props: SearchViewProps) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Icon name="search-outline" size={30} color="#373d41" />
        <Text style={styles.placeholderText}>Search any podcast topic</Text>
      </View>

      <Icon name="mic-outline" size={30} color="#373d41" />
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f2e9',
    padding: 15,
    paddingVertical: 15,
    borderRadius: 7,
    marginHorizontal: 15,
  },
  placeholderText: {
    color: '#98958b',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Thin',
  },
});
