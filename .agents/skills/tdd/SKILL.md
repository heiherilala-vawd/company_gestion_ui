---
name: tdd
description: Cypress E2E test-driven development with Red-Green-Refactor loop, HTTP-level mocking via cy.intercept(), and Istanbul coverage verification. Use when writing new features, fixing bugs, or modifying UI behavior in a React Admin project.
---

# Test-Driven Development (Cypress E2E)

## Philosophy

Tests verify behavior through the rendered UI — the user's public interface. DOM structure changes, but behavior shouldn't. A good test reads like a spec: "user can create a fixed cost" tells you exactly what capability exists.

**Good E2E tests** exercise real UI flows through the browser. They click buttons, fill forms, and assert on visible content. They survive refactors because they don't care about implementation — only what the user sees.

**Bad E2E tests** are coupled to implementation details: CSS classes, internal component state, DOM structure not visible to users. They break on innocuous changes.

## Anti-Pattern: Horizontal Slices

**DO NOT** write all tests first, then all implementation. Treat RED as "one test" and GREEN as "make that one test pass."

```
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2
```

## Workflow

### 1. Plan

- [ ] Identify the UI behavior to test
- [ ] Confirm mock API responses needed (shape, status codes, delays)
- [ ] Check which localStorage keys must be set (`currentCompanyId`, `currentJobId`, etc.)
- [ ] Determine viewport (desktop vs mobile)

### 2. RED — Write failing Cypress test

Write a test that describes the desired behavior:

```typescript
it('creates a new fixed cost', () => {
  cy.intercept('GET', '**/fixed_costs*', {
    statusCode: 200,
    body: { data: [], total: 0 },
  }).as('getFixedCosts')

  cy.intercept('PUT', '**/fixed_costs*', {
    statusCode: 200,
    body: createOrUpdateFixedCost(mockFixedCost),
  }).as('createFixedCost')

  insertInToLocalStorage(['currentCompanyId', 'company1_id'])
  loginInPage()
  cy.wait('@getCompanies')

  cy.contains('p', 'Frais Fixes').click()
  cy.contains('button', 'Créer').click()
  cy.get('input[name="description"]').type('New cost')
  cy.get('button[type="submit"]').click()

  cy.wait('@createFixedCost')
  cy.contains('New cost').should('be.visible')
})
```

Run it — it **must fail** (feature not yet implemented).

### 3. GREEN — Implement minimal code

Write the minimum production code to make the test pass:
- Component, page, or API handler
- No over-engineering
- No code for tests not yet written

Run the full suite:
```bash
npm run cypress:coverage
```

### 4. REFACTOR — Clean up

Improve code while keeping all tests green:

- [ ] Extract duplicated test helpers into `src/__tests__/support/utils.ts`
- [ ] Add reusable intercept helpers (`interceptGeneralEndpoint()`)
- [ ] Improve test readability (clearer names, better assertions)
- [ ] Remove speculative assertions

**Never refactor while RED.** Get to GREEN first.

## Checklist Per Cycle

```
[ ] Test describes visible UI behavior, not DOM structure
[ ] Test uses data-testid or visible text selectors (not CSS classes)
[ ] Test would survive internal component refactor
[ ] API mocks use cy.intercept() at HTTP level
[ ] localStorage keys are set before login when needed
[ ] Mobile viewport tested when layout differs
[ ] Code is minimal for this test
[ ] No speculative features added
[ ] Coverage thresholds met (lines ≥57, functions ≥60, branches ≥45, statements ≥55)
```
