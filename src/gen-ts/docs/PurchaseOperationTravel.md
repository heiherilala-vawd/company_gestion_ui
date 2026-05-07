
# PurchaseOperationTravel


## Properties

Name | Type
------------ | -------------
`id` | string
`expense_id` | string
`departure_location` | [CrupdateWarehouse](CrupdateWarehouse.md)
`arrival_location` | [CrupdateWarehouse](CrupdateWarehouse.md)
`departure_date` | Date
`arrival_date` | Date
`fee` | number

## Example

```typescript
import type { PurchaseOperationTravel } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": travel_op_001,
  "expense_id": exp_003,
  "departure_location": null,
  "arrival_location": null,
  "departure_date": 2024-02-25T09:00Z,
  "arrival_date": 2024-02-25T17:00Z,
  "fee": 500,
} satisfies PurchaseOperationTravel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PurchaseOperationTravel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


