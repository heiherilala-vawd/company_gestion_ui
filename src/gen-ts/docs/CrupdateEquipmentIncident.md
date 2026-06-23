
# CrupdateEquipmentIncident


## Properties

Name | Type
------------ | -------------
`comment` | string
`id` | string
`incident_type` | [IncidentType](IncidentType.md)
`equipment_id` | string
`user_id` | string
`travel_id` | string
`location` | string

## Example

```typescript
import type { CrupdateEquipmentIncident } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": inc_001,
  "incident_type": null,
  "equipment_id": eq_001,
  "user_id": user_123456,
  "travel_id": travel_eq_010,
  "location": wh_001,
} satisfies CrupdateEquipmentIncident

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateEquipmentIncident
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


