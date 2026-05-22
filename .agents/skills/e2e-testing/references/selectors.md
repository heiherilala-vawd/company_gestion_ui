# Selectors (MUI v7 / React Admin v5)

## `data-testid` Convention

All form inputs should use `data-testid="input-{source}"`:

```tsx
<TextInput source="description" data-testid="input-description" />
<SelectInput source="status" data-testid="input-status" />
<DateInput source="start-date" data-testid="input-start-date" />
```

`ReferenceSelectWithCreate` auto-generates `data-testid="input-{reference}-id"`.

## Form Input Selectors

| Component | Selector |
|-----------|----------|
| Single-line TextInput | `[data-testid="input-{name}"] input` |
| Multiline TextInput | `[data-testid="input-{name}"] textarea:visible` |
| SelectInput (enum) | `[data-testid="input-{name}"]` → click → `selectEnumType('input-{name}', 'Label')` |
| DateInput | `[data-testid="input-{name}"] [type="datetime-local"]` |
| Autocomplete | `[data-testid="input-{name}-id"]` → click → `#menu-{source}` → contains text → click |

## ReferenceSelectWithCreate

The component auto-generates `data-testid="input-{reference}-id"` (e.g., `input-companies-id` for `reference="companies"`).

**To open and select:**

```typescript
// Use data-testid to open
cy.get('[data-testid="input-companies-id"]').click()
// Wait for options to load
cy.wait('@getCompaniesSelection')
// Select via #menu-{source} ID
cy.get('#menu-company_id').contains('Company Name').click({ force: true })
```

The menu ID format is `#menu-{source}` where `source` is the field name in the form (e.g., `company_id`, `job_id`, `user_id`).

**Convenience wrappers** in `support/utils.ts`:

```typescript
selectJob()        // selects reference to jobs
selectCompany()    // selects reference to companies
selectExpense()    // selects reference to expenses
selectUser()       // selects reference to users
selectEnumType(testId, label)  // selects from a simple enum SelectInput
```

## React Admin Class Selectors

| Element | Selector |
|---------|----------|
| Create button | `[class*="RaCreateButton"]` |
| Edit button | `.RaEditButton-root` |
| Sidebar | `[class*="RaSidebar"]` |
| Sidebar toggle | `[class*="RaSidebarToggleButton"]` |
| AppBar | `[class*="RaAppBar"]` |
| Error notification | `.RaNotification-error` |
| Sidebar modal (mobile) | `.RaSidebar-modal` |
| Sidebar container | `[data-testid="menu-item-home"]` |

## Mobile Navigation

After clicking a sidebar link on mobile, close the sidebar modal:

```typescript
cy.get('body').then(($body) => {
  if ($body.find('.RaSidebar-modal').length) {
    cy.get('body').click(0, 0)
  }
})
```

## Login Page Selectors

```typescript
cy.get('input[name="username"]').type('email@example.com')  // first input
cy.get('input[type="password"]').type('password')
cy.get('button[type="submit"]').click()
```

Note: The login field is called `username` even though the API expects `email`.

## General Notes

- MUI v7 combobox options have `role="option"` but no `[role="listbox"]` wrapper — select directly with `[role="option"]`
- Textarea selectors need `:visible` suffix (some forms have hidden duplicate `data-testid`)
- Menu `data-testid` format: `menu-{resource-name}` (e.g., `menu-travel-equipments`)
- Use `{ force: true }` on `.click()` when elements are overlapped (dropdowns, modals)
- For error notifications: `cy.get('.RaNotification-error').should('be.visible')`
