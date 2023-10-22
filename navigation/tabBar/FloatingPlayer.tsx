import React, {useContext} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayMedia} from '../../src/application/playMedia';
import {PlayerContext} from '../../src/services/contexts/PlayerContext';
import {State} from 'react-native-track-player';

const FloatingPlayer = () => {
  const {getState, pauseMedia} = usePlayMedia();
  const state = getState();

  const {isFloatingOpen, close, playerSheetModalRef} =
    useContext(PlayerContext);

  const closeBottomPlayer = () => {
    close();
    pauseMedia();
  };

  const pressBottomPlayer = () => {
    playerSheetModalRef?.current?.present();
  };

  if ((state === State.Paused || state === State.Playing) && isFloatingOpen)
    return (
      <Pressable onPress={pressBottomPlayer}>
        <View style={[styles.container, styles.row]}>
          <View style={[styles.row, {gap: 20}]}>
            <Icon name="play" size={20} color="white" />
            <View>
              <Text style={styles.text}>Adele</Text>
              <Text style={styles.text}>Easy on me</Text>
            </View>
          </View>
          <View style={[styles.row, {gap: 20}]}>
            <Icon name="heart-outline" size={20} color="white" />
            <Pressable onPress={closeBottomPlayer}>
              <Icon name="close" size={23} color="white" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  else return null;
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'space-between',
  },
  text: {color: 'white'},
});
