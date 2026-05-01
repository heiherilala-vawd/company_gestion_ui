# CrupdateBankFee

## Properties

| Name          | Type   |
| ------------- | ------ |
| `id`          | string |
| `expense_id`  | string |
| `bank_name`   | string |
| `description` | string |

## Example

```typescript
import type { CrupdateBankFee } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  id: null,
  expense_id: null,
  bank_name: null,
  description: null,
} satisfies CrupdateBankFee

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateBankFee
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
