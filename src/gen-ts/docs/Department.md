# Department

## Properties

| Name          | Type                      |
| ------------- | ------------------------- |
| `comment`     | string                    |
| `created_at`  | Date                      |
| `updated_at`  | Date                      |
| `created_by`  | [AuditUser](AuditUser.md) |
| `updated_by`  | [AuditUser](AuditUser.md) |
| `id`          | string                    |
| `name`        | string                    |
| `description` | string                    |
| `company_id`  | string                    |

## Example

```typescript
import type { Department } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": dept_001,
  "name": Génie Civil,
  "description": Département en charge des travaux de génie civil,
  "company_id": comp_btp001,
} satisfies Department

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Department
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
