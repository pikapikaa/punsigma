import {useMediaPlayer} from '../services/mediaPlayerAdapter';
import { Podcast } from '../domain/Podcast';

export function usePlayMedia() {
  const mediaPlayer = useMediaPlayer();

  async function playAndPauseMedia() {
    mediaPlayer.playAndPause();
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

  return {
    playAndPauseMedia,
    pauseMedia,
    seekToMedia,
    addMedia,
    resetMedia,
    getProgress,
    isPlaying,
  };
}
