import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

interface PodcastTranslateViewScreenProps {
  isVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
}

const PodcastTranslateViewScreen = ({
  isVisible,
  setModalVisible,
  title,
  description,
}: PodcastTranslateViewScreenProps) => {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isVisible}
      onBackdropPress={() => setModalVisible(false)}>
      <View style={styles.content}>
        <Text style={styles.modalText}>{title}</Text>
        <ScrollView>
          <Text style={{color: 'gray'}}>{description}</Text>
        </ScrollView>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
            }}>
            <Icon name="heart" size={13} color="red" />
            <Icon name="arrow-forward" size={10} color="grey" />
            <Text style={{color: '#1e6887', fontWeight: 'bold'}}>Burlang</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PodcastTranslateViewScreen;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    minHeight: SCREEN_HEIGHT / 2,
    maxHeight: SCREEN_HEIGHT - 100,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
});
