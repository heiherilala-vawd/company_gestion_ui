# MaterialWarehouseInfo

## Properties

| Name        | Type                      |
| ----------- | ------------------------- |
| `warehouse` | [Warehouse](Warehouse.md) |
| `quantity`  | number                    |

## Example

```typescript
import type { MaterialWarehouseInfo } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  warehouse: null,
  quantity: 50,
} satisfies MaterialWarehouseInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MaterialWarehouseInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
