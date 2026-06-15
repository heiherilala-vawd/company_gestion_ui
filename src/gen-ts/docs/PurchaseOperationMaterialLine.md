# PurchaseOperationMaterialLine

## Properties

| Name                 | Type                                    |
| -------------------- | --------------------------------------- |
| `material`           | [CrupdateMaterial](CrupdateMaterial.md) |
| `expense_id`         | string                                  |
| `purchase_id`        | string                                  |
| `travel_material_id` | string                                  |
| `quantity`           | number                                  |
| `unit_price`         | number                                  |

## Example

```typescript
import type { PurchaseOperationMaterialLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  material: null,
  expense_id: exp_001,
  purchase_id: purch_004,
  travel_material_id: travel_mat_001,
  quantity: 100,
  unit_price: 15,
} satisfies PurchaseOperationMaterialLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PurchaseOperationMaterialLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
