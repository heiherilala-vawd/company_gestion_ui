# Deep Test Helpers

From "A Philosophy of Software Design" applied to E2E tests:

**Deep helper** = simple call signature + lots of setup logic hidden inside

```
┌───────────────────────────────┐
│   insertInToLocalStorage()    │  ← One call, one array arg
├───────────────────────────────┤
│  cy.window()                  │
│  then(win) {                  │
│    localStorage.setItem()     │
│    ...                        │
│  }                            │
└───────────────────────────────┘
```

**Shallow helper** = complex setup exposed in every test (avoid)

```
┌───────────────────────────────────────┐
│  cy.window().then(win =>               │
│    win.localStorage.setItem(...)       │  ← Every test repeats this
│    win.localStorage.setItem(...)       │
│    win.localStorage.setItem(...)       │
│  )                                     │
└───────────────────────────────────────┘
```

## Good deep helpers in this project

| Helper | Interface | What it hides |
|--------|-----------|---------------|
| `insertInToLocalStorage(keys)` | `string[]` | `cy.window()` → localStorage.setItem loop |
| `interceptGeneralEndpoint()` | none | 10+ cy.intercept() calls for common resources |
| `navigateToMobile()` | none | viewport change + sidebar toggle + waits |
| `loginInPage()` | none | visit login → fill fields → submit → wait |
| `toAmountRegex(value)` | `number` → `RegExp` | Locale-agnostic number formatting |
| `selectReferenceWithCreate()` | (resource, label, ...) | Dialog open → fill → submit → close |
| `expandMonetarySections()` | none | Click all accordion expand buttons |
| `openMobileSidebar()` | none | viewport resize + toggle + wait + close |

When you find yourself repeating 3+ lines of setup in multiple tests, extract a deep helper.
