import type { Calendar, Locale } from 'expo-localization';
import { getCalendars, getLocales } from 'expo-localization';

export const LOCAL_UNITS: Pick<
  Locale,
  | 'currencyCode'
  | 'currencySymbol'
  | 'decimalSeparator'
  | 'digitGroupingSeparator'
  | 'languageCode'
  | 'languageTag'
  | 'measurementSystem'
  | 'regionCode'
  | 'temperatureUnit'
  | 'textDirection'
> &
  Pick<Calendar, 'calendar' | 'firstWeekday' | 'timeZone' | 'uses24hourClock'> = {
  ...getLocales()[0],
  ...getCalendars()[0],
};
