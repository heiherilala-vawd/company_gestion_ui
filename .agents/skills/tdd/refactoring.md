# Refactor Candidates (E2E Tests)

After all tests pass, look for:

- **Duplicated intercepts** → extract into `interceptGeneralEndpoint()` or a shared test helper
- **Long test files** → split by feature domain
- **Fragile selectors** → replace CSS classes with `data-testid` or `cy.contains()`
- **Flaky waits** → replace `cy.wait(1000)` with `cy.wait('@alias')` or `{ timeout: 10000 }`
- **Duplicated setup** → extract into `beforeEach()` or deep helpers in `utils.ts`
- **Hardcoded URLs** → replace with mock factory functions (e.g., `createOrUpdateFixedCost()`)
- **Brittle assertions** → use `toAmountRegex()` for formatted numbers, not exact string match

## When to refactor test code

- Same intercept pattern appears in 3+ tests
- Test setup exceeds 10 lines before the first user action
- A test consistently times out or needs manual retries
- Multiple tests repeat the same localStorage sequence
