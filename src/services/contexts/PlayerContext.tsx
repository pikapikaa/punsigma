import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useState} from 'react';
import {createContext, useContext, useRef} from 'react';
import {Podcast} from '../../domain/Podcast';

export type PlayerContextProp = {
  isOpen: boolean;
  playerSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  close: () => void;
  open: () => void;
  podcast?: Podcast;
  setPodcast?: (p: Podcast) => void;
};

export const PlayerContext = createContext<PlayerContextProp>({
  isOpen: true,
  playerSheetModalRef: useRef<BottomSheetModal>(null),
  close: () => {},
  open: () => {},
});

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider = ({children}: {children: React.JSX.Element}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [podcast, setPodcast] = useState<Podcast>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const setCurrentPodcast = (p: Podcast) => {
    setPodcast(p);
  };

  return (
    <PlayerContext.Provider
      value={{
        isOpen,
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
