import { I18n } from 'i18n-js';

import en from './en.json';
import type { AvailableLanguages } from './languages';
import { LANGUAGE_CODES } from './languages';
import { LOCAL_UNITS } from './local-units';
import tr from './tr.json';
import type { TranslationKeys } from './translation-keys';

const translations: Record<AvailableLanguages, TranslationKeys> = {
  en,
  tr,
};

const i18n = new I18n(translations);

i18n.enableFallback = true;
i18n.locale = LOCAL_UNITS.languageCode ?? LANGUAGE_CODES.EN;

export { i18n };
