import type { TranslateOptions } from 'i18n-js';

function getNestedValue<T>(obj: T, key: string): unknown {
  return key.split('.').reduce((acc: unknown, curr: string): unknown => {
    if (acc !== null && typeof acc === 'object' && curr in acc)
      return (acc as Record<string, unknown>)[curr];

    return null;
  }, obj as unknown);
}
function interpolate(template: string, options: TranslateOptions): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_match, key) =>
    key in options ? String(options[key]) : ''
  );
}

export const helpers = { getNestedValue, interpolate };
