import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Image, Platform} from 'react-native';

interface PhoneInputProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChangeText: (value: string) => void;
}

const PhoneInput = ({
  placeholder = 'Номер телефона',
  disabled = false,
  value = '',
  onChangeText,
}: PhoneInputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  function onFocus() {
    setIsFocus(true);
  }

  function onBlur() {
    setIsFocus(false);
  }

  function onChangeTextInput(value: string) {
    onChangeText(value);
  }

  const editable = disabled ? false : true;

  return (
    <View style={[styles.container, isFocus ? styles.invalid : null]}>
      <Image
        source={
          isFocus
            ? require('../../../assets/icons/settings_icons/icon_phone_active.png')
            : require('../../../assets/icons/settings_icons/icon_phone.png')
        }
        style={{
          width: 25,
          height: 25,
          marginBottom: 5,
        }}
      />

      <Text
        style={[
          styles.number,
          isFocus ? {color: '#239457'} : {color: '#c0cbd8'},
        ]}>
        +7
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#c0cbd8"
        editable={editable}
        style={[
          styles.textInput,
          isFocus ? {color: 'green'} : {color: '#c0cbd8'},
        ]}
        maxLength={10}
        value={value}
        onChangeText={onChangeTextInput}
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'
        }
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#c0cbd8',
  },
  textInput: {
    width: '100%',
    padding: 0,
    margin: 0,
    paddingLeft: 5,
    fontSize: 19,
    fontFamily: 'HeliosCond',
    paddingBottom: 5,
  },
  invalid: {
    borderBottomWidth: 2,
    borderColor: '#239457',
  },
  number: {
    fontFamily: 'HeliosCond',
    fontSize: 19,
    paddingBottom: 5,
    color: '#c0cbd8',
  },
});
