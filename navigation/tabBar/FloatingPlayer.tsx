import React, {useContext} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayMedia} from '../../src/application/playMedia';
import {PlayerContext} from '../../src/services/contexts/PlayerContext';

const FloatingPlayer = () => {
  const {pauseMedia, playAndPauseMedia, isPlaying} = usePlayMedia();

  const {isFloatingOpen, close, playerSheetModalRef, podcast} =
    useContext(PlayerContext);

  const closeBottomPlayer = () => {
    close();
    pauseMedia();
  };

  const pressBottomPlayer = () => {
    playerSheetModalRef?.current?.present();
  };

  if (isFloatingOpen)
    return (
      <View style={[styles.container, styles.row]}>
        <View style={[styles.row, {gap: 20, flex: 1}]}>
          <Pressable onPress={playAndPauseMedia}>
            <Icon
              name={isPlaying() ? 'pause' : 'play'}
              size={20}
              color="white"
            />
          </Pressable>
          <Pressable onPress={pressBottomPlayer} style={{flex: 1}}>
            <View>
              <Text style={styles.text}>{podcast?.artist}</Text>
              <Text style={styles.text}>{podcast?.title}</Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.row, {gap: 20}]}>
          <Icon name="heart-outline" size={20} color="white" />
          <Pressable onPress={closeBottomPlayer}>
            <Icon name="close" size={23} color="white" />
          </Pressable>
        </View>
      </View>
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
  text: {color: 'white', fontFamily: 'RobotoSlab-Regular'},
});
