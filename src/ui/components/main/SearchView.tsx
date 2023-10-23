import React from 'react';
import {Text, View, StyleSheet, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchViewProps extends ViewProps {
  placeholder?: string;
}

const SearchView = ({placeholder = 'Search', ...props}: SearchViewProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.left}>
        <Icon name="search-outline" size={30} color="#373d41" />
        <Text style={styles.placeholderText}>{placeholder}</Text>
      </View>
      <Icon name="filter" size={25} color="#373d41" />
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
    borderRadius: 7,
    marginHorizontal: 15,
  },
  left: {flexDirection: 'row', alignItems: 'center', gap: 10},
  placeholderText: {
    color: '#98958b',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Thin',
  },
});
