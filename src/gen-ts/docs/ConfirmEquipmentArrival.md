
# ConfirmEquipmentArrival


## Properties

Name | Type
------------ | -------------
`id` | string
`status` | [TransportStatus](TransportStatus.md)
`incident_id` | string

## Example

```typescript
import type { ConfirmEquipmentArrival } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": travel_eq_010,
  "status": null,
  "incident_id": inc_001,
} satisfies ConfirmEquipmentArrival

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ConfirmEquipmentArrival
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


