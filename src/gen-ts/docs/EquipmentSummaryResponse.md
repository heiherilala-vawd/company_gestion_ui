
# EquipmentSummaryResponse


## Properties

Name | Type
------------ | -------------
`total_equipment` | number
`available_count` | number
`broken_count` | number
`lost_count` | number
`avg_age_years` | number
`total_usage_hours` | number

## Example

```typescript
import type { EquipmentSummaryResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "total_equipment": null,
  "available_count": null,
  "broken_count": null,
  "lost_count": null,
  "avg_age_years": null,
  "total_usage_hours": null,
} satisfies EquipmentSummaryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EquipmentSummaryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


