import React, {ReactNode} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ColorValue,
  DimensionValue,
  Pressable,
  Platform,
} from 'react-native';

interface ButtonCustomProps {
  color: ColorValue;
  width: DimensionValue;
  disabled?: boolean;
  disabledColor?: ColorValue;
  colorText: ColorValue;
  children: ReactNode;
  onPress: () => void;
}

const ButtonCustom = ({
  color,
  width,
  disabled = false,
  disabledColor,
  colorText,
  children,
  onPress,
}: ButtonCustomProps) => {
  const content = (
    <View
      style={[
        styles.button,
        {backgroundColor: color, width: width},
        disabled
          ? [
              {
                backgroundColor: disabledColor,
                borderColor: '#aaa',
              },
            ]
          : null,
      ]}>
      <Text style={[styles.text, {color: colorText}]}>{children}</Text>
    </View>
  );

  if (disabled) {
    return content;
  }

  return (
    <Pressable
      android_ripple={{color: 'grey', borderless: false}}
      style={({pressed}) => [
        {opacity: pressed && Platform.OS === 'ios' ? 0.7 : 1},
        styles.pressable,
      ]}
      onPress={onPress}>
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 34,
    backgroundColor: '#ffffff',
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 0.5,
  },
  text: {
    textAlign: 'center',
    fontSize: 19,
    fontFamily: 'HeliosCond-Bold',
  },
  pressable: {width: '100%', alignItems: 'center'},
});

export default ButtonCustom;
