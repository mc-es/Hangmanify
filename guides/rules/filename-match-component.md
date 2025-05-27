## Enforce Filename to Match Default Export (`filename-match-component`)

This rule enforces that the file name exactly matches the name of the default exported component in **PascalCase**. This helps maintain consistency, makes components easier to locate, and improves maintainability in large projects.

---

### 🧩 Rule Type

- **Type:** `problem`
- **Category:** `Stylistic Issues`
- **Fixable:** No
- **Recommended:** No

---

### 📚 Why Enforce Filename Matching?

Enforcing filename to match the exported component:

- Makes files easier to find by their component names.
- Helps IDEs and tooling work more predictably.
- Reduces confusion in large codebases.
- Encourages cleaner and more consistent structure.

---

### ✅ Correct Usage

**`Button.tsx`**

```tsx
const Button = () => { ... }
export default Button
// or
export default function Button() { ... }
// or
export default class Button extends React.Component { ... }
```

### ❌ Incorrect Usage

**`Button.tsx`**

```tsx
const ButtonTest = () => { ... }
export default ButtonTest
              ^^^^^^^^^^^
// The file name "Button" must exactly match the component name "ButtonTest"
```

---

### 📂 Ignored Files

This rule only applies to files whose path includes `components`.
The following are ignored:

- Files not in a `components` directory
- Files that include `.stories.` in their filename
- Files named `index.tsx`, `index.jsx`, etc.

---

### 🔍 When To Enable

Enable this rule when:

- You want filename and component naming consistency.
- You're working with React or component-based structure.
- You want to reduce ambiguity across your codebase.

---

### ⚙️ Options

This rule does not take any configuration options.
