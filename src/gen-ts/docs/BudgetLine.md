# BudgetLine

## Properties

| Name             | Type                      |
| ---------------- | ------------------------- |
| `comment`        | string                    |
| `created_at`     | Date                      |
| `updated_at`     | Date                      |
| `created_by`     | [AuditUser](AuditUser.md) |
| `updated_by`     | [AuditUser](AuditUser.md) |
| `id`             | string                    |
| `company_id`     | string                    |
| `category`       | string                    |
| `planned_amount` | number                    |
| `actual_amount`  | number                    |
| `period_start`   | Date                      |
| `period_end`     | Date                      |
| `description`    | string                    |

## Example

```typescript
import type { BudgetLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": bl_001,
  "company_id": comp_btp001,
  "category": Matériaux,
  "planned_amount": 1000000.0,
  "actual_amount": 950000.0,
  "period_start": Mon Jan 01 03:00:00 EAT 2024,
  "period_end": Sun Mar 31 03:00:00 EAT 2024,
  "description": Budget matériaux Q1 2024,
} satisfies BudgetLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BudgetLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
