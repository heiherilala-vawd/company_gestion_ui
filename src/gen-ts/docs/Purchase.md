# Purchase

## Properties

| Name           | Type                                            |
| -------------- | ----------------------------------------------- |
| `id`           | string                                          |
| `expense`      | [CrupdateExpenseMoney](CrupdateExpenseMoney.md) |
| `supplier`     | string                                          |
| `equipment`    | [CrupdateEquipment](CrupdateEquipment.md)       |
| `material`     | [CrupdateMaterial](CrupdateMaterial.md)         |
| `quantity`     | number                                          |
| `is_equipment` | boolean                                         |

## Example

```typescript
import type { Purchase } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  id: null,
  expense: null,
  supplier: null,
  equipment: null,
  material: null,
  quantity: null,
  is_equipment: null,
} satisfies Purchase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Purchase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
