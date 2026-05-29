# CrupdateEmployeeLeaveConfig

## Properties

| Name                      | Type   |
| ------------------------- | ------ |
| `id`                      | string |
| `hire_date`               | Date   |
| `contract_type`           | string |
| `vacation_days_per_month` | number |
| `end_date`                | Date   |
| `weekly_hours`            | number |
| `comment`                 | string |

## Example

```typescript
import type { CrupdateEmployeeLeaveConfig } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": config_1,
  "hire_date": Thu Jun 01 03:00:00 EAT 2023,
  "contract_type": CDI,
  "vacation_days_per_month": 2.5,
  "end_date": Thu Dec 31 03:00:00 EAT 2026,
  "weekly_hours": 35,
  "comment": Nouveau contrat,
} satisfies CrupdateEmployeeLeaveConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateEmployeeLeaveConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
