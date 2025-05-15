import React, { createContext, useContext, useMemo, useState } from 'react';

import type { TranslateOptions } from 'i18n-js';
import { Helpers } from 'src/utils';

import i18n from 'src/constants/localization/i18n';
import {
  type AvailableLanguages,
  type DotNotationKeys,
  LANGUAGE_CODES,
} from 'src/constants/localization/languages';
import { LOCAL_UNITS } from 'src/constants/localization/local-units';
import type { TranslationKeys } from 'src/constants/localization/translation-keys';

type I18nFunction = (
  key: DotNotationKeys<TranslationKeys>,
  options?: TranslateOptions
) => string;

interface I18nContextProps {
  readonly locale: AvailableLanguages;
  readonly t: I18nFunction;
  toggleI18n: (locale: AvailableLanguages) => void;
}

const getTranslation: I18nFunction = (key, options) => {
  const translation = Helpers.getNestedValue(i18n.translations[i18n.locale], key);
  if (typeof translation !== 'string') return key;
  return options ? Helpers.interpolate(translation, options) : translation;
};

const I18nContext = createContext<I18nContextProps>({
  locale: (LOCAL_UNITS.languageCode as AvailableLanguages) ?? LANGUAGE_CODES.EN,
  t: getTranslation,
  toggleI18n: () => {},
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.JSX.Element => {
  const [locale, setLocale] = useState<AvailableLanguages>(
    i18n.locale as AvailableLanguages
  );

  const toggleI18n = (newLocale: AvailableLanguages): void => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  const contextValue = useMemo<I18nContextProps>(
    () => ({ locale, t: getTranslation, toggleI18n }),
    [locale]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextProps => useContext<I18nContextProps>(I18nContext);
