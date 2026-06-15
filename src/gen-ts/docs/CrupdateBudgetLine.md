# CrupdateBudgetLine

## Properties

| Name             | Type   |
| ---------------- | ------ |
| `comment`        | string |
| `id`             | string |
| `company_id`     | string |
| `category`       | string |
| `planned_amount` | number |
| `actual_amount`  | number |
| `period_start`   | Date   |
| `period_end`     | Date   |
| `description`    | string |

## Example

```typescript
import type { CrupdateBudgetLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": bl_001,
  "company_id": comp_btp001,
  "category": Matériaux,
  "planned_amount": 1000000.0,
  "actual_amount": 950000.0,
  "period_start": Mon Jan 01 03:00:00 EAT 2024,
  "period_end": Sun Mar 31 03:00:00 EAT 2024,
  "description": Budget matériaux Q1 2024,
} satisfies CrupdateBudgetLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateBudgetLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
