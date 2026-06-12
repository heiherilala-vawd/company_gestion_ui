# CrupdateOtherExpenseType

## Properties

| Name          | Type   |
| ------------- | ------ |
| `comment`     | string |
| `id`          | string |
| `name`        | string |
| `description` | string |
| `company_id`  | string |

## Example

```typescript
import type { CrupdateOtherExpenseType } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": other_exp_type_001,
  "name": Logistique,
  "description": Frais logistiques et transport,
  "company_id": comp_btp001,
} satisfies CrupdateOtherExpenseType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateOtherExpenseType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
