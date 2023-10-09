import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';

import PhoneInput from '../components/ui/elements/PhoneInput';
import ButtonCustom from '../components/ui/elements/ButtonCustom';
import CalendarModule from '../components/nativeModules/CalendarModule';
import MediaModule from '../components/nativeModules/MediaModule';

const WelcomeScreen = () => {
  const [phone, setPhone] = useState('');

  function onChangePhone(text: string) {
    setPhone(text);
  }

  function submit() {
    MediaModule.playSound(
      'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3',
    );
  }

  function pause() {
    MediaModule.pauseSound();
  }

  function goToLicense() {
    console.log('goToLicense');
  }

  return (
    <View style={styles.container}>
      <View style={[{alignItems: 'center'}]}>
        <Image
          style={[
            {
              width: 150,
              height: 200,
              resizeMode: 'contain',
            },
          ]}
          source={require('../assets/backgrounds/icon_authorization.png')}
        />
      </View>

      <View style={styles.formInput}>
        <PhoneInput onChangeText={onChangePhone} value={phone} />

        <ButtonCustom
          width="100%"
          color="#239457"
          colorText="#ffffff"
          onPress={submit}>
          ВОЙТИ ИЛИ СОЗДАТЬ
        </ButtonCustom>
        <ButtonCustom
          width="100%"
          color="#239457"
          colorText="#ffffff"
          onPress={pause}>
          Pause
        </ButtonCustom>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Text style={styles.textLicense}>
          Нажимая "войти или создать", я соглашаюсь с
          <Text style={styles.underlineLicense}>
            {' '}
            Пользовательским соглашением{' '}
          </Text>
          ООО "Единый информационно-расчетный центр", с обработкой персональной
          информации на условиях Политики конфиденциальности
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, paddingVertical: 15},
  formInput: {gap: 20},
  textLicense: {
    textAlign: 'justify',
    color: '#c0cbd8',
    fontSize: 14,
    fontFamily: 'HeliosCond',
  },
  underlineLicense: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
