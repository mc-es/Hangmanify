## Enforce Matching useNavigation/useRoute Generic and Import (`match-navigation-route`)

This rule enforces two things inside `.tsx` files under `src/screens/`:

1. `useNavigation` and `useRoute` **must be used with a generic** of the form `RouteNames.<SCREEN_NAME>`
2. These hooks **must not be imported from `@react-navigation/native`** — only local wrappers are allowed

---

### 🧩 Rule Type

- **Type:** `problem`
- **Category:** `Type Safety`
- **Fixable:** No
- **Recommended:** No

---

### 📚 Why Enforce This Rule?

This rule ensures:

- Screens use only their corresponding route types
- Navigation types are explicitly stated
- Hooks are only imported from your app’s local navigation wrapper (not directly from external libraries)
- Misconfigured or missing generics are caught early

---

### ✅ Correct Usage

**`Home.tsx`**

```tsx
import { useNavigation, useRoute } from 'src/navigations';

const navigation = useNavigation<RouteNames.HOME>();
const route = useRoute<RouteNames.HOME>();
```

### ❌ Incorrect Usage

**`Home.tsx`**

```tsx
import { useNavigation } from 'src/navigations';

// Wrong generic
const navigation = useNavigation<RouteNames.ABOUT>();
                                      ^^^^^^^^^^^^^
// Generic "RouteNames.ABOUT" does not match expected "RouteNames.HOME"

// Missing generic
const route = useRoute();
                ^^^^^^^^
// You must specify a generic like useRoute<RouteNames.HOME>

// Disallowed import
import { useNavigation } from '@react-navigation/native';
                            ^^^^^^^^^^^^^^^^^^^^^^^^^^
// Do not import "useNavigation" from @react-navigation/native. Use your local wrapper instead.

const navigation = useNavigation<RouteNames.HOME>();
```

---

### 📂 Ignored Files

The following are ignored:

- Files outside `src/screens/`
- Non-`.tsx` files
- Other hooks or identifiers not named `useNavigation` or `useRoute`

---

### 🔍 When To Enable

Enable this rule when:

- You have a central `RouteNames` object for navigation.
- You use a wrapper around `useNavigation` and `useRoute` for type-safe routing.
- You want to prevent untyped or mismatched navigation access in screens.

---

### ⚙️ Options

This rule does not take any configuration options.
