## Validate Translation Keys Passed to t() (`valid-translation-key`)

This rule checks that the string key passed to the `t()` function matches a valid key defined in the `TranslationKeys` type.
It ensures that all translations are statically verified and no invalid keys are used at runtime.

---

### 🧩 Rule Type

- **Type:** `problem`
- **Category:** `Best Practices`
- **Fixable:** No
- **Recommended:** No

---

### 📚 Why Validate Translation Keys?

- Prevents typos in translation keys.
- Avoids runtime translation errors or missing texts.
- Enables static checking of localization usage.
- Ensures consistency with your i18n type definitions.

---

### ✅ Correct Usage

```ts
// src/constants/localization/translation-keys.d.ts
export type TranslationKeys = {
  greetings: {
    hi: string;
    welcome: string;
  };
};
```

```ts
// any place in the code
t('greetings.hi');
t('greetings.welcome');
```

### ❌ Incorrect Usage

```ts
// Key does not exist in TranslationKeys
t('greetings.hello');
// Error: The translation key "greetings.hello" is not defined in TranslationKeys. Did you mean: "greetings.hi", "greetings.welcome"?
```

If a key is invalid, the rule will suggest possible alternatives using a string similarity algorithm (Levenshtein distance).
Only suggestions with close matches are shown, and dynamic keys are ignored.

---

### 📂 Ignored Files

This rule applies to all files, but it only checks `t()` calls with a string literal as the first argument.

- `t('greetings.' + dynamic)`
- Any dynamic or non-literal key usage

---

### 🔍 When To Enable

Enable this rule when:

- You have a static `TranslationKeys` type in your project.
- You want to catch invalid translation keys during development.
- You want to enforce type-safe internationalization usage.

---

### ⚙️ Options

This rule does not take any configuration options.
