
# MaterialSummaryResponse


## Properties

Name | Type
------------ | -------------
`stock_value_total` | number
`consumption_cost_total` | number
`total_materials_count` | number
`expiring_count` | number

## Example

```typescript
import type { MaterialSummaryResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "stock_value_total": null,
  "consumption_cost_total": null,
  "total_materials_count": null,
  "expiring_count": null,
} satisfies MaterialSummaryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MaterialSummaryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


