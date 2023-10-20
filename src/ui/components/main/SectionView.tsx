import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
} from 'react-native';

interface SectionViewProps {
  renderItem: ListRenderItem<any> | null | undefined;
  data: Array<any>;
  title: string;
  numColumns: number;
}

const SectionView = ({
  renderItem,
  data,
  title,
  numColumns,
}: SectionViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}>
        <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={<View style={{height: 30}}></View>}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
};

export default SectionView;

const styles = StyleSheet.create({
  container: {gap: 20},
  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
});
