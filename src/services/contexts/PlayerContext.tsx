import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useState} from 'react';
import {createContext, useContext, useRef} from 'react';

export type PlayerContextProp = {
  isFloatingOpen: boolean;
  playerSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  close: () => void;
  open: () => void;
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const close = () => {
    setIsFloatingOpen(false);
  };

  const open = () => {
    setIsFloatingOpen(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        isFloatingOpen,
        close: close,
        open: open,
        playerSheetModalRef: bottomSheetModalRef,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
