import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation/navigation';
import {SetupService} from './src/services/SetupService';
import {PlayerProvider} from './src/services/contexts/PlayerContext';
import {LocalizationProvider} from './src/services/contexts/LocalizationContext';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <LocalizationProvider>
            <PlayerProvider>
              <Inner />
            </PlayerProvider>
          </LocalizationProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const Inner: FC = () => {
  const isPlayerReady = useSetupPlayer();

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return <Navigation />;
};

function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
