## Enforce Error Handling in Async Functions (`require-try-catch-async`)

This rule enforces that all `async` functions must include a `try/catch` block for proper error handling. If an `@safe` comment is placed directly above the function declaration or expression, the rule will skip validation.

---

### 🧩 Rule Type

- **Type:** `problem`
- **Category:** `Error Handling`
- **Fixable:** No
- **Recommended:** No

---

### 📚 Why Enforce Try/Catch in Async Functions?

Using `try/catch` in async functions:

- Prevents unhandled promise rejections.
- Ensures predictable behavior in the presence of errors.
- Encourages developers to think explicitly about failure cases.
- Helps improve code quality and runtime resilience.

---

### ✅ Correct Usage

```ts
// With try/catch
const loadData = async () => {
  try {
    await fetchData();
  } catch (e) {
    console.error(e);
  }
};
```

```ts
// With @safe comment
// @safe
const loadData = async () => {
  await fetchData();
};

const loadData =
// @safe
async () => {
  await fetchData();
};

// @safe
const loadData = async function () {
  await fetchData();
};

const loadData =
// @safe
async function () {
  await fetchData();
};

// @safe
async function loadData() {
  await fetchData();
}
```

### ❌ Incorrect Usage

```ts
// Missing try/catch and no @safe
const loadData = async () => {
  await fetchData();
};
```

```ts
// Misspelled comment
// safe
const loadData = async function () {
  await fetchData();
};
```

```ts
// Misplaced comment
async function loadData() {
  // @safe
  await fetchData();
}
```

---

### 📂 Ignored Files

This rule applies to all JavaScript and TypeScript files.
However, a function is **ignored** if:

- It is not marked `async`
- It includes a `try/catch` block
- It has an `@safe` comment directly above it

---

### 🔍 When To Enable

Enable this rule when:

- You want consistent error handling in async code.
- You want to prevent unhandled promise rejections.
- You want to enforce disciplined, defensive programming practices.

---

### ⚙️ Options

This rule does not take any configuration options.
