# EmployeeLeaveConfig

## Properties

| Name                      | Type                      |
| ------------------------- | ------------------------- |
| `comment`                 | string                    |
| `created_at`              | Date                      |
| `updated_at`              | Date                      |
| `created_by`              | [AuditUser](AuditUser.md) |
| `updated_by`              | [AuditUser](AuditUser.md) |
| `id`                      | string                    |
| `hire_date`               | Date                      |
| `contract_type`           | string                    |
| `vacation_days_per_month` | number                    |
| `end_date`                | Date                      |
| `weekly_hours`            | number                    |

## Example

```typescript
import type { EmployeeLeaveConfig } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": config_1,
  "hire_date": Thu Jun 01 03:00:00 EAT 2023,
  "contract_type": CDI,
  "vacation_days_per_month": 2.5,
  "end_date": Thu Dec 31 03:00:00 EAT 2026,
  "weekly_hours": 35,
} satisfies EmployeeLeaveConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EmployeeLeaveConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
