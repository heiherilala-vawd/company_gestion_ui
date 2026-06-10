
# EquipmentDashboardResponse


## Properties

Name | Type
------------ | -------------
`total_equipment` | number
`broken_count` | number
`available_count` | number
`usage_rate` | number
`avg_age_years` | number
`category_distribution` | Array&lt;object&gt;
`maintenance_cost_by_equipment` | Array&lt;object&gt;
`scheduled_maintenances` | Array&lt;object&gt;
`leased_equipment` | Array&lt;object&gt;
`lost_count` | number
`usage_by_job` | Array&lt;object&gt;

## Example

```typescript
import type { EquipmentDashboardResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "total_equipment": null,
  "broken_count": null,
  "available_count": null,
  "usage_rate": null,
  "avg_age_years": null,
  "category_distribution": null,
  "maintenance_cost_by_equipment": null,
  "scheduled_maintenances": null,
  "leased_equipment": null,
  "lost_count": null,
  "usage_by_job": null,
} satisfies EquipmentDashboardResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EquipmentDashboardResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


