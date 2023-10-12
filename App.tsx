import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, ActivityIndicator, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import Navigation from './navigation/stack';
import {SetupService} from './services/SetupService';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Inner />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const Inner: FC = () => {
  const isPlayerReady = useSetupPlayer();

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation />
    </SafeAreaView>
  );
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

export default App;
