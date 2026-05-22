# Mock Pattern

## File Structure

Each resource has a mock file at `src/__tests__/mocks/responses/<resource>-api.ts` containing:

1. **Full entity mocks** — 2-3 entities with all fields (including nested `created_by`, `updated_by`, company/job relations)
2. **`resourcesMock` array** — all entity mocks combined
3. **`crupdateResourcesMock` array** — 2 items: one with existing `id` (for update), one with new `id` (for create)
4. **`createOrUpdateResources()` function** — dynamically builds full entities from request body

Helpers (`mockSuccessResponse`, `mockErrorResponse`) are in `auth-api.ts`.

## Template

```typescript
import { Resource, CrupdateResource } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { company1Mock, company2Mock } from './companies-api.ts'
import { toAuditUserMapper } from '../../support/mappers.ts'

// --- Full entity mocks ---

export const resource1Mock: Resource = {
  id: 'res1_id',
  company: {
    id: company1Mock?.id,
    name: company1Mock.name,
    // ... other company fields
  },
  description: 'Resource 1 description',
  status: 'ACTIVE',
  created_at: '2022-01-05T08:00:00Z',
  updated_at: '2022-03-15T10:30:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const resource2Mock: Resource = { /* similar shape */ }
export const resourcesMock: Resource[] = [resource1Mock, resource2Mock]

// --- Crupdate mocks (simplified, FKs instead of nested objects) ---

export const crupdateResourcesMock: CrupdateResource[] = [
  {
    id: 'res1_id',         // existing ID → used for UPDATE
    company_id: company1Mock?.id,
    description: 'Updated description',
    status: 'ACTIVE',
  },
  {
    id: 'res3_id',         // new ID → used for CREATE
    company_id: company2Mock?.id,
    description: 'New resource',
    status: 'PENDING',
  },
]

// --- Dynamic create/update function ---

export const createOrUpdateResources = (resources: CrupdateResource[]): Resource[] => {
  return resources.map((resource) => ({
    ...resource,
    id: `newId`,
    company: {
      id: `newId`,
      name:
        resource.company_id === company2Mock.id
          ? company2Mock.name
          : company1Mock.name,
      // ... other company fields
    },
    created_at: resource.id ? resource1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
```

## Key Rules

- **Use generated types** from `src/gen-ts/src` (never hand-write types)
- **Export everything**: individual mocks, array, crupdate array, and the `createOrUpdate*` function
- **Register in `mocks/responses/index.ts`** — re-export all symbols
- **`createOrUpdate*` must reconstruct nested relations** (company, job, user, etc.) because the request body only has FK IDs
- **Use `toAuditUserMapper()`** from `support/mappers.ts` for `created_by` / `updated_by`
- The `id` in `createOrUpdate*` should be `'newId'` (string literal used across all existing mocks)

## Mock Response Helpers

From `auth-api.ts`:

```typescript
export const mockSuccessResponse = (body: any) => ({ statusCode: 200, body })
export const mockErrorResponse = (type: string, message: string, statusCode: number = 401) => ({
  statusCode,
  body: { type, message },
})
```

## Adding to Centralized Intercepts

After creating mocks, add intercepts in `support/utils.ts` → `interceptGeneralEndpoint()`:

```typescript
cy.intercept('GET', '**/resources*', mockSuccessResponse(resourcesMock)).as('getResources')
cy.intercept('GET', '**/resources/res1_id*', mockSuccessResponse(resource1Mock)).as('getResource')
```

## Mapper Functions

Located in `support/mappers.ts`. Convert full entity types to their `Crupdate` variants (flatten FKs, drop audit fields). Use them in `createOrUpdate*` functions to reconstruct nested objects.
