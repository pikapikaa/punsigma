import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, ActivityIndicator, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation/stack';
import {SetupService} from './src/services/SetupService';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <Inner />
        </SafeAreaProvider>
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

export default App;
