export enum LANGUAGE_CODES {
  EN = 'en',
  TR = 'tr',
}
export const enum LANGUAGE_NAMES {
  ENGLISH = 'English',
  TURKISH = 'Türkçe',
}

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export type AvailableLanguages = (typeof LANGUAGE_CODES)[keyof typeof LANGUAGE_CODES]; //- 'en' | 'tr'
export type DotNotationKeys<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T & (number | string)]: T[K] extends object
          ? `${K}.${DotNotationKeys<T[K], Prev[D]>}` | `${K}`
          : `${K}`;
      }[keyof T & (number | string)]
    : never;
