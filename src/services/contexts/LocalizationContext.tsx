import React, {useState} from 'react';
import {createContext, useContext} from 'react';
import {I18n} from 'i18n-js';

import {en, mn} from '../../lib/i18n/supportedLanguages';
import {getLocales} from 'react-native-localize';

export type LocalizationContextProp = {
  i18n: I18n | null;
};

export const LocalizationContext = createContext<LocalizationContextProp>({
  i18n: null,
});

export const useLocalizationContext = () => useContext(LocalizationContext);

export const LocalizationProvider: React.JSX.Element = ({children}) => {
  const createNewLocale = () => {
    const i18n = new I18n();
    i18n.translations = {mn, en};
    i18n.enableFallback = true;
    const locales = getLocales();
    let langCode = 'en';
    if (locales.length) {
      langCode = locales[0].languageCode;
    }
    i18n.locale = langCode;
    return i18n;
  };

  const [i18n, setI18n] = useState<I18n>(createNewLocale());

  return (
    <LocalizationContext.Provider value={{i18n}}>
      {children}
    </LocalizationContext.Provider>
  );
};
