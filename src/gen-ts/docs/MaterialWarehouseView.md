# MaterialWarehouseView

## Properties

| Name        | Type                                    |
| ----------- | --------------------------------------- |
| `material`  | [CrupdateMaterial](CrupdateMaterial.md) |
| `warehouse` | [Warehouse](Warehouse.md)               |
| `quantity`  | number                                  |

## Example

```typescript
import type { MaterialWarehouseView } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  material: null,
  warehouse: null,
  quantity: 100,
} satisfies MaterialWarehouseView

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MaterialWarehouseView
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
