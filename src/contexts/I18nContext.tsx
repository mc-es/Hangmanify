import React, { createContext, useContext, useMemo, useState } from 'react';

import type { TranslateOptions } from 'i18n-js';

import type {
  AvailableLanguages,
  DotNotationKeys,
  TranslationKeys,
} from 'src/constants/localization';
import { i18n, LANGUAGE_CODES, LOCAL_UNITS } from 'src/constants/localization';
import { getNestedValue, interpolate } from 'src/utils/helper';

type I18nFunction = (
  key: DotNotationKeys<TranslationKeys>,
  options?: TranslateOptions
) => string;

interface I18nContextProps {
  locale: AvailableLanguages;
  toggleI18n: (locale: AvailableLanguages) => void;
  t: I18nFunction;
}

const getTranslation: I18nFunction = (key, options) => {
  const translation = getNestedValue(i18n.translations[i18n.locale], key);
  if (typeof translation !== 'string') return key;
  return options ? interpolate(translation, options) : translation;
};

const I18nContext = createContext<I18nContextProps>({
  locale: (LOCAL_UNITS.languageCode as AvailableLanguages) ?? LANGUAGE_CODES.EN,
  toggleI18n: () => {},
  t: getTranslation,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<AvailableLanguages>(
    i18n.locale as AvailableLanguages
  );

  const toggleI18n = (newLocale: AvailableLanguages): void => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  const contextValue = useMemo<I18nContextProps>(
    () => ({
      locale,
      toggleI18n,
      t: getTranslation,
    }),
    [locale]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextProps => useContext<I18nContextProps>(I18nContext);
