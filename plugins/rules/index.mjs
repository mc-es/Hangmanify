import filenameMatchComponent from './filename-match-component.mjs';
import jsxSortProps from './jsx-sort-props.mjs';
import matchNavigationRoute from './match-navigation-route.mjs';
import noDirectHookImports from './no-direct-hook-imports.mjs';
import requireTryCatchAsync from './require-try-catch-async.mjs';
import requireUsestateType from './require-usestate-type.mjs';
import validTranslationKey from './valid-translation-key.mjs';

export default {
  rules: {
    'filename-match-component': filenameMatchComponent,
    'jsx-sort-props': jsxSortProps,
    'match-navigation-route': matchNavigationRoute,
    'no-direct-hook-imports': noDirectHookImports,
    'require-try-catch-async': requireTryCatchAsync,
    'require-usestate-type': requireUsestateType,
    'valid-translation-key': validTranslationKey,
  },
};
