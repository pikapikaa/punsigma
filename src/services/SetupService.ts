import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  PlayerOptions,
} from 'react-native-track-player';

export const DefaultRepeatMode = RepeatMode.Queue;
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

const setupPlayer = async (options: PlayerOptions) => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      return (error as Error & {code?: string}).code;
    }
  };
  while ((await setup()) === 'android_cannot_setup_player_in_background') {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise<void>(resolve => setTimeout(resolve, 1));
  }
};

export const SetupService = async () => {
  await setupPlayer({});
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
    progressUpdateEventInterval: 2,
  });
};
