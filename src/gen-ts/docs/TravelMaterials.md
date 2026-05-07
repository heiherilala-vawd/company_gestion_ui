
# TravelMaterials


## Properties

Name | Type
------------ | -------------
`comment` | string
`created_at` | Date
`updated_at` | Date
`created_by` | [AuditUser](AuditUser.md)
`updated_by` | [AuditUser](AuditUser.md)
`id` | string
`travel` | [CrupdateTravelExpense](CrupdateTravelExpense.md)
`material` | [CrupdateMaterial](CrupdateMaterial.md)
`quantity` | number
`quantity_received` | number
`arrival_date` | Date
`arrival_location` | [CrupdateWarehouse](CrupdateWarehouse.md)

## Example

```typescript
import type { TravelMaterials } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": tm_001,
  "travel": null,
  "material": null,
  "quantity": 100,
  "quantity_received": 100,
  "arrival_date": 2024-02-20T18:00Z,
  "arrival_location": null,
} satisfies TravelMaterials

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TravelMaterials
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


