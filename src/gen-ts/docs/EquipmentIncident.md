
# EquipmentIncident


## Properties

Name | Type
------------ | -------------
`comment` | string
`created_at` | Date
`updated_at` | Date
`created_by` | [AuditUser](AuditUser.md)
`updated_by` | [AuditUser](AuditUser.md)
`id` | string
`incident_type` | [IncidentType](IncidentType.md)
`equipment_id` | string
`user_id` | string
`travel_id` | string
`location` | string

## Example

```typescript
import type { EquipmentIncident } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Equipment damaged during transport,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": inc_001,
  "incident_type": null,
  "equipment_id": eq_001,
  "user_id": user_123456,
  "travel_id": travel_eq_010,
  "location": wh_001,
} satisfies EquipmentIncident

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EquipmentIncident
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


