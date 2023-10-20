import {useMediaPlayer} from '../services/mediaPlayerAdapter';
import {Podcast} from '../domain/Podcast';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import TrackPlayer from 'react-native-track-player';

export function usePlayMedia() {
  const mediaPlayer = useMediaPlayer();

  async function playInit(
    bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>,
    podcast: Podcast,
  ) {
    bottomSheetModalRef.current?.present();
    await resetMedia();
    await addMedia(podcast);
    await playAndPauseMedia();
  }

  async function playAndPauseMedia() {
    mediaPlayer.playAndPause();
  }

  async function playMedia(
    bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>,
    podcast: Podcast,
  ) {
    const tracksInQueue = await TrackPlayer.getQueue();
    const flag = tracksInQueue.findIndex(t => t.id === podcast.id);
    if (flag > -1) {
      mediaPlayer.play();
      if (bottomSheetModalRef?.current) bottomSheetModalRef.current?.present();
    } else {
      playInit(bottomSheetModalRef, podcast);
    }
  }

  async function pauseMedia() {
    mediaPlayer.pause();
  }

  async function seekToMedia(sek: number) {
    mediaPlayer.seekTo(sek);
  }

  async function addMedia(podcast: Podcast) {
    mediaPlayer.add(podcast);
  }

  async function resetMedia() {
    mediaPlayer.reset();
  }

  function getProgress() {
    return mediaPlayer.getProgress();
  }

  function isPlaying() {
    return mediaPlayer.isPlaying();
  }

  function getState() {
    return mediaPlayer.getState();
  }

  return {
    playAndPauseMedia,
    pauseMedia,
    seekToMedia,
    addMedia,
    resetMedia,
    getProgress,
    isPlaying,
    getState,
    playMedia,
  };
}
