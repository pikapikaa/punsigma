import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';

import {translateWord} from '../../../services/api';
import {removePunctuation} from '../../../lib/util';

interface PodcastTranslateViewScreenProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  text: string;
}

const PodcastTranslateViewScreen = ({
  isVisible,
  onBackdropPress,
  text,
}: PodcastTranslateViewScreenProps) => {
  const purifiedText = removePunctuation(text);
  const {data, isLoading, error} = useSWR(
    ['', {word: purifiedText}],
    ([url, payload]) => translateWord(payload.word),
  );

  let content = null;
  if (isLoading) content = <ActivityIndicator />;
  else if (error) content = <Text>Что-то пошло не так</Text>;
  else content = <Text style={{color: 'gray'}}>{data}</Text>;

  return (
    <Modal
      hideModalContentWhileAnimating
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}>
      <View style={styles.content}>
        <Text style={styles.modalText}>{text}</Text>
        <ScrollView>{content}</ScrollView>
        <View style={{alignItems: 'flex-end'}}>
          <View style={styles.bottom}>
            <Icon name="heart" size={13} color="red" />
            <Icon name="arrow-forward" size={10} color="grey" />
            <Text style={styles.textBottom}>Burlang</Text>
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
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
  },
  textBottom: {color: '#1e6887', fontWeight: 'bold'},
});
