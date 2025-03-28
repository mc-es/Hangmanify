import filenameMatchComponent from './filename-match-component.mjs';
import jsxSortProps from './jsx-sort-props.mjs';
import requireTryCatchAsync from './require-try-catch-async.mjs';
import requireUsestateType from './require-usestate-type.mjs';
import validTranslationKey from './valid-translation-key.mjs';

export default {
  rules: {
    'filename-match-component': filenameMatchComponent,
    'jsx-sort-props': jsxSortProps,
    'require-try-catch-async': requireTryCatchAsync,
    'require-usestate-type': requireUsestateType,
    'valid-translation-key': validTranslationKey,
  },
};
