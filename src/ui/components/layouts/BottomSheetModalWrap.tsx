import React, {useCallback, useMemo, ReactNode} from 'react';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

interface BottomSheetModalWrapProps {
  modalRef: React.RefObject<BottomSheetModal>;
  children: ReactNode;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheetModalWrap = ({
  modalRef,
  children,
  setModalVisible,
}: BottomSheetModalWrapProps) => {
  const snapPoints = useMemo(() => ['95%'], []);

  const handleSheetChanges = useCallback(index => {
    if (index < 0) setModalVisible(false);
    else setModalVisible(true);
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
