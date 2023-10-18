import {useEffect} from 'react';
import {BackHandler, Platform} from 'react-native';

export function useModalBackHandler(
  isOpen: boolean,
  closeModal: () => void,
  navigationBack: () => void,
) {
  useEffect(() => {
    if (Platform.OS === 'ios') return;

    const backAction = () => {
      if (isOpen) {
        closeModal();
      } else {
        navigationBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isOpen]);
}
