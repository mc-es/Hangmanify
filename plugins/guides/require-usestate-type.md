## Enforce useState Type Argument in TSX Files (`require-usestate-type`)

This rule enforces that every call to `useState` includes an explicit type argument. It helps ensure type safety, prevents unintended `any` usage, and improves overall code robustness.

---

### 🧩 Rule Type

- **Type:** `problem`
- **Category:** `Type Safety`
- **Fixable:** No
- **Recommended:** No

---

### 📚 Why Enforce useState Typing?

Specifying a type when using `useState`:

- Prevents accidental use of `any` as the inferred type.
- Improves IDE support such as autocompletion and type checking.
- Encourages developers to explicitly think about types.
- Helps maintain strict and reliable type usage across the codebase.

---

### ✅ Correct Usage

```tsx
const [count, setCount] = useState<number>(0);

const [text, setText] = React.useState<string>('');

const [items, setItems] = useState<string[]>([]);
```

### ❌ Incorrect Usage

```tsx
const [count, setCount] = useState(0);
                     ^^^^^^^^^^^^^^^
// useState should always have a type argument.

const [text, setText] = React.useState('')
                          ^^^^^^^^^^^^^^
// 'React.useState' should always have a type argument.
```

---

### 📂 Ignored Files

This rule **does not** check the following:

- Calls where `useState` is **renamed via import alias**, such as:

  ```tsx
  import { useState as useCustomState } from 'react';

  const [field, setField] = useCustomState(null); // ❌ This will NOT be checked
  ```

---

### 🔍 When To Enable

Enable this rule when:

- You are using React with or without TypeScript.
- You want to avoid implicit `any` usage in state.
- You want to enforce strict and explicit typing conventions.

---

### ⚙️ Options

This rule does not take any configuration options.
