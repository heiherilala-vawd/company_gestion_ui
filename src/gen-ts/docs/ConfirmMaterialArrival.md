
# ConfirmMaterialArrival


## Properties

Name | Type
------------ | -------------
`id` | string
`quantity_received` | number
`quantity_lost` | number

## Example

```typescript
import type { ConfirmMaterialArrival } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": travel_mat_010,
  "quantity_received": 80,
  "quantity_lost": 20,
} satisfies ConfirmMaterialArrival

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ConfirmMaterialArrival
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


