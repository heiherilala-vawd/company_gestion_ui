# CrupdateIncomeType

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
import type { CrupdateIncomeType } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": income_type_001,
  "name": Facturation client,
  "description": Revenus issus de la facturation client,
  "company_id": comp_btp001,
} satisfies CrupdateIncomeType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateIncomeType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
