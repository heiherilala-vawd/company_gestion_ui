# CrupdateLeaveType

## Properties

| Name                  | Type    |
| --------------------- | ------- |
| `id`                  | string  |
| `name`                | string  |
| `description`         | string  |
| `paid`                | boolean |
| `deduct_from_balance` | boolean |
| `color`               | string  |
| `days_per_year`       | number  |
| `company_id`          | string  |
| `comment`             | string  |

## Example

```typescript
import type { CrupdateLeaveType } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": leave_type_1,
  "name": Congé payé,
  "description": Congés annuels payés,
  "paid": true,
  "deduct_from_balance": true,
  "color": #4CAF50,
  "days_per_year": 30,
  "company_id": comp_btp001,
  "comment": Modification des droits,
} satisfies CrupdateLeaveType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateLeaveType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
