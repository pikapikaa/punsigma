import React, {useCallback, useMemo, ReactNode} from 'react';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

interface BottomSheetModalWrapProps {
  modalRef: React.RefObject<BottomSheetModal>;
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheetModalWrap = ({
  modalRef,
  children,
  setIsOpen,
}: BottomSheetModalWrapProps) => {
  const snapPoints = useMemo(() => ['95%'], []);

  const handleSheetChanges = useCallback(async (index: number) => {
    if (index === 0) setIsOpen(true);
    else setIsOpen(false);
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.1}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}>
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheetModalWrap;
