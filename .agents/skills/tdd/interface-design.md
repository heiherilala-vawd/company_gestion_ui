# Test Interface Design (Cypess Selectors)

Tests interact with the UI through visible content and semantic selectors.

## Good Selectors (preferred order)

1. **Visible text** — `cy.contains('button', 'Créer')`, `cy.contains('p', 'Companies')`
2. **`data-testid`** — `cy.get('[data-testid="MenuToggleButton"]')`
3. **Name attributes** — `cy.get('input[name="description"]')`
4. **Role selectors** — `cy.get('button[type="submit"]')`
5. **Label text** — `cy.contains('label', 'Description')`

## Bad Selectors (never use)

- CSS class names: `.MuiButton-root`, `.RaList-card`, `.css-1abc`
- Positional: `.first()`, `.last()`, `.eq(2)`
- Fragile structure: `div > div > span > button`
- Loading indicators: `[role="progressbar"]` (transient)

## localStorage Interface

The app uses localStorage for hierarchy context. Must be set **after** `loginInPage()`:

```typescript
insertInToLocalStorage(['currentCompanyId', 'company1_id'])
// Keys are set in order: currentCompanyId → currentJobId → ...
```

Always call `insertInToLocalStorage` after `loginInPage()` so `cy.window()` is on the correct origin.
