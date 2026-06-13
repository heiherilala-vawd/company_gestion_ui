---
name: tdd
description: Test-Driven Development with Cypress E2E and Vitest unit tests. Red-Green-Refactor loop, HTTP-level mocking via cy.intercept(), and Istanbul coverage verification. Use on any code change — features, fixes, refactors, style, form updates — to write the test first.
---

# Test-Driven Development

## Philosophy

Tests verify behavior. A good test reads like a spec: "user can create a fixed cost" tells you exactly what capability exists. Every code change should start with a test.

**Two TDD modes:**

| Mode | Tool | Scope | When |
|------|------|-------|------|
| **E2E** | Cypress | Full UI flows through browser | UI changes, new pages, form flows |
| **Unit** | Vitest | Pure logic, data layer, utils | Data provider, auth, config, utilities |

## Anti-Pattern: Horizontal Slices

**DO NOT** write all tests first, then all implementation. One test → one implementation.

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

- [ ] Is this a UI change or a logic change?
  - **UI change** → E2E test (Cypress)
  - **Logic change** → Unit test (Vitest)
- [ ] For E2E: confirm mock API responses needed, localStorage keys, viewport
- [ ] For unit: identify dependencies to mock (`vi.mock()`, `globalThis.fetch`, etc.)

### 2. RED — Write failing test

**E2E mode** (Cypress):
```typescript
it('creates a new fixed cost', () => {
  cy.intercept('GET', '**/fixed_costs*', mockSuccessResponse([])).as('getFixedCosts')
  cy.intercept('PUT', '**/fixed_costs*', (req) => {
    req.reply(mockSuccessResponse(createOrUpdateFixedCost(req.body)))
  }).as('createFixedCost')
  insertInToLocalStorage(['currentCompanyId', 'company1_id'])
  loginInPage()
  cy.contains('p', 'Frais Fixes').click()
  cy.contains('button', 'Créer').click()
  cy.get('input[name="description"]').type('New cost')
  cy.get('button[type="submit"]').click()
  cy.wait('@createFixedCost')
  cy.contains('New cost').should('be.visible')
})
```

**Unit mode** (Vitest):
```typescript
it('returns job-scoped URL for expenses', () => {
  localStorage.setItem('user_id', 'user1')
  localStorage.setItem('currentCompanyId', 'comp1')
  localStorage.setItem('currentJobId', 'job1')
  const url = getMiddleUrl('expenses')
  expect(url).toContain('/users/user1/companies/comp1/jobs/job1/expenses')
})
```

Run it — it **must fail** (feature not yet implemented).

### 3. GREEN — Implement minimal code

Write the minimum production code to make the test pass:
- No over-engineering
- No code for tests not yet written

Run the relevant suite:
```bash
# For unit tests
npx vitest run path/to/test

# For E2E tests
npm run cypress:coverage
```

### 4. REFACTOR — Clean up

Improve code while keeping all tests green:

- [ ] Extract duplicated test helpers into shared files
- [ ] Improve test readability
- [ ] Remove speculative assertions

**Never refactor while RED.** Get to GREEN first.

## Choosing the Right Test Type

| Change | Test Type | Why |
|--------|-----------|-----|
| New form field | E2E | UI interaction visible to user |
| New button/action | E2E | Click flow, navigation |
| API URL resolution | Unit | Pure logic, no browser |
| Data provider behavior | Unit | Data transformation, pagination |
| Auth permissions | Unit | Boolean logic, no rendering |
| Utility function | Unit | Pure function |
| Style/theme change | E2E | Visual output matters |

## Project Context

This project uses **Cypress E2E as primary testing** with **Vitest unit tests** for non-UI logic. Before starting any work:
- [ ] Run `npm run cypress:coverage` to confirm E2E suite is GREEN
- [ ] Write a failing test first for new behaviors (RED)
- [ ] After changes, run relevant tests to confirm GREEN
- [ ] Final verification: `npm run lint` → `npm run type-check` → `npm run cypress:coverage`

## Checklist Per Cycle

```
[ ] Correct test type chosen (E2E vs unit)
[ ] Test describes behavior, not DOM structure
[ ] For E2E: uses data-testid or visible text selectors
[ ] For E2E: API mocks via cy.intercept() at HTTP level
[ ] For E2E: localStorage keys set before login
[ ] For unit: dependencies properly mocked (vi.mock)
[ ] For unit: localStorage/crypto mocked via setup.ts
[ ] Mobile viewport tested when layout differs
[ ] Code is minimal for this test
[ ] No speculative features added
[ ] Coverage thresholds met (lines ≥57, functions ≥60, branches ≥45, statements ≥55)
```
