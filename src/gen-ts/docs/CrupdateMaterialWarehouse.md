# CrupdateMaterialWarehouse

## Properties

| Name           | Type   |
| -------------- | ------ |
| `material_id`  | string |
| `warehouse_id` | string |
| `quantity`     | number |

## Example

```typescript
import type { CrupdateMaterialWarehouse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  material_id: mat_001,
  warehouse_id: wh_001,
  quantity: 50,
} satisfies CrupdateMaterialWarehouse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateMaterialWarehouse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
