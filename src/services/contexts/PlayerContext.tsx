import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useState} from 'react';
import {createContext, useContext, useRef} from 'react';
import {Podcast} from '../../domain/Podcast';

export type PlayerContextProp = {
  isFloatingOpen: boolean;
  playerSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  close: () => void;
  open: () => void;
  podcast?: Podcast;
  setPodcast?: (p: Podcast) => void;
};

export const PlayerContext = createContext<PlayerContextProp>({
  isFloatingOpen: true,
  playerSheetModalRef: useRef<BottomSheetModal>(null),
  close: () => {},
  open: () => {},
});

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider: React.JSX.Element = ({children}) => {
  const [isFloatingOpen, setIsFloatingOpen] = useState(true);
  const [podcast, setPodcast] = useState<Podcast>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const close = () => {
    setIsFloatingOpen(false);
  };

  const open = () => {
    setIsFloatingOpen(true);
  };

  const setCurrentPodcast = (p: Podcast) => {
    setPodcast(p);
  };

  return (
    <PlayerContext.Provider
      value={{
        isFloatingOpen,
        close: close,
        open: open,
        playerSheetModalRef: bottomSheetModalRef,
        podcast,
        setPodcast: setCurrentPodcast,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
