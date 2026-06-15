# MaterialBreakdownResponse

## Properties

| Name                       | Type                |
| -------------------------- | ------------------- |
| `top5_stock_value`         | Array&lt;object&gt; |
| `top5_consumption_cost`    | Array&lt;object&gt; |
| `stock_by_material`        | Array&lt;object&gt; |
| `consumption_by_material`  | Array&lt;object&gt; |
| `stock_value_by_warehouse` | Array&lt;object&gt; |
| `expiring_materials`       | Array&lt;object&gt; |

## Example

```typescript
import type { MaterialBreakdownResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  top5_stock_value: null,
  top5_consumption_cost: null,
  stock_by_material: null,
  consumption_by_material: null,
  stock_value_by_warehouse: null,
  expiring_materials: null,
} satisfies MaterialBreakdownResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MaterialBreakdownResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
