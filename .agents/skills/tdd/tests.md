# Good and Bad Cypress E2E Tests

## Good Tests

**Behavioral**: Tests what the user sees and does.

```typescript
// GOOD: Tests visible behavior
it('shows error when name is empty', () => {
  cy.intercept('PUT', '**/companies*', mockErrorResponse(400, 'Name required')).as('saveCompany')

  insertInToLocalStorage(['currentCompanyId', 'company1_id'])
  loginInPage()
  cy.contains('p', 'Companies').click()

  cy.contains('button', 'Créer').click()
  cy.get('button[type="submit"]').click()
  cy.wait('@saveCompany')
  cy.contains('Name required').should('be.visible')
})
```

Characteristics:

- Uses visible text (`cy.contains()`) or semantic selectors
- Mocks at HTTP level with `cy.intercept()`
- Tests complete user flow
- One logical assertion per test
- Survives component refactors

## Bad Tests

**Implementation-coupled**: Depends on internals.

```typescript
// BAD: Coupled to CSS class and internal structure
it('submits form', () => {
  cy.get('.RaForm-card').should('exist')
  cy.get('input').first().type('test')
  cy.get('.MuiButton-contained').click()
})
```

Red flags:

- CSS class selectors (`.Mui-*`, `.Ra-*`, `.css-*`)
- Fragile positional selectors (`.first()`, `.eq(2)`)
- Asserts on loading spinners or internal component state
- No `cy.intercept()` — relies on real API
- Tests "loading" states instead of data states

```typescript
// BAD: Fragile and implementation-coupled
it('loads data', () => {
  cy.get('[role="progressbar"]').should('exist')
  cy.get('[role="progressbar"]').should('not.exist')
  cy.get('tr').should('have.length', 3)
})

// GOOD: Tests visible outcome
it('loads data', () => {
  cy.contains('td', 'Item Name').should('be.visible')
})
```

## Mobile Testing

Always test mobile when layout changes:

```typescript
it('works on mobile', () => {
  navigateToMobile()  // sets viewport, opens sidebar, clicks toggle
  cy.contains('p', 'Companies').click()
  cy.contains('New Cost').should('be.visible')
  // toggle sidebar back for cleanup
  cy.get('[data-testid="MenuToggleButton"]').click({ force: true })
})
```

Use `openMobileSidebar()` when you need to navigate from the sidebar on mobile.
