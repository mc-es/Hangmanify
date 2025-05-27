## Enforce Alphabetical Sorting of JSX Props (`jsx-sort-props`)

This rule enforces that all props in a JSX opening tag are sorted in **strict alphabetical order**. Keeping props sorted helps improve code readability, maintain consistency across components, and reduce noise in code reviews.

---

### 🧩 Rule Type

- **Type:** `suggestion`
- **Category:** `Stylistic Issues`
- **Fixable:** No
- **Recommended:** No

---

### 📚 Why Enforce Prop Order?

Sorting JSX props alphabetically:

- Makes components easier to scan visually.
- Reduces unnecessary diffs in version control (e.g., git).
- Helps maintain a consistent coding style across teams.
- Aids in spotting duplicates or missing props faster.

---

### ✅ Correct Usage

```tsx
<MyButton color="primary" disabled label="Submit" />

<UserCard age={30} firstName="John" lastName="Doe" />
```

### ❌ Incorrect Usage

```tsx
<MyButton label="Submit" color="primary" disabled />
              ^^^^^^^^
// 'color' should come before 'label'

<UserCard lastName="Doe" age={30} firstName="John" />
            ^^^^^^^^^^
// 'age' should come before 'lastName'
```

---

### 🔍 When To Enable

Enable this rule when:

- You want consistent JSX formatting.
- You work in a team and care about clean diffs.
- You're building or maintaining a design system or shared component library.

---

### ⚙️ Options

This rule does not take any configuration options.
