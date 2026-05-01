# CrupdatePurchase

## Properties

| Name           | Type    |
| -------------- | ------- |
| `id`           | string  |
| `expense_id`   | string  |
| `supplier`     | string  |
| `equipment`    | string  |
| `material`     | string  |
| `quantity`     | number  |
| `is_equipment` | boolean |

## Example

```typescript
import type { CrupdatePurchase } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  id: null,
  expense_id: null,
  supplier: null,
  equipment: null,
  material: null,
  quantity: null,
  is_equipment: null,
} satisfies CrupdatePurchase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdatePurchase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
