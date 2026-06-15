# CrupdateCompanyFixedCost

## Properties

| Name          | Type   |
| ------------- | ------ |
| `comment`     | string |
| `id`          | string |
| `name`        | string |
| `amount`      | number |
| `description` | string |
| `company_id`  | string |
| `start_date`  | Date   |
| `end_date`    | Date   |

## Example

```typescript
import type { CrupdateCompanyFixedCost } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": fixed_cost_001,
  "name": Loyer bureau,
  "amount": 2000.0,
  "description": Loyer mensuel des locaux,
  "company_id": comp_btp001,
  "start_date": Mon Jan 01 03:00:00 EAT 2024,
  "end_date": Tue Dec 31 03:00:00 EAT 2024,
} satisfies CrupdateCompanyFixedCost

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateCompanyFixedCost
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
