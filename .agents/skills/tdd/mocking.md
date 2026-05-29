# HTTP-Level Mocking with cy.intercept()

Mock at the **HTTP boundary** only. Never mock React components, data providers, or internal modules.

## Good Mocks

```typescript
// List endpoint
cy.intercept('GET', '**/fixed_costs*', {
  statusCode: 200,
  body: { data: [mockFixedCost], total: 1 },
}).as('getFixedCosts')

// Create endpoint (React Admin uses PUT for both create and update)
cy.intercept('PUT', '**/fixed_costs*', {
  statusCode: 200,
  body: createOrUpdateFixedCost(newCostData),
}).as('createFixedCost')

// Error response
cy.intercept('PUT', '**/companies*', {
  statusCode: 400,
  body: { errors: [{ message: 'Name is required' }] },
}).as('saveCompany')
```

## Mock Response Helpers

Use the project's mock factories and helpers from `src/__tests__/mocks/responses/`:

```typescript
import { mockFixedCost, createOrUpdateFixedCost } from '../mocks/responses/fixed-costs-api'
import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
```

- `createOrUpdateFixedCost(overrides)` — returns a full response object with defaults merged
- `mockSuccessResponse(body)` — wraps body in `{ data }` envelope
- `mockErrorResponse(status, message)` — returns structured error response

## URL Patterns

Resources follow hierarchical URL patterns. Match with wildcards:

| Resource | Intercept pattern |
|----------|------------------|
| Fixed costs | `**/fixed_costs*` |
| Receipts | `**/incomes_receipts*` (URL override) |
| Companies | `**/companies*` |
| Jobs | `**/jobs*` |
| Maintenances | `**/maintenances*` (company-scoped) |
| Loans | `**/loans*` |

Always use `**/` prefix to work with the full proxied URL. Append `*` to match query params.

## Don't Mock

- **React components** — test the real rendering
- **React Admin data provider** — test through the real data flow
- **Browser APIs** — let Cypress handle them
- **Internal state** — assert on visible behavior only
