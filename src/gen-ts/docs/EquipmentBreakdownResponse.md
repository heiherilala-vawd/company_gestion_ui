
# EquipmentBreakdownResponse


## Properties

Name | Type
------------ | -------------
`category_distribution` | Array&lt;object&gt;
`status_breakdown` | Array&lt;object&gt;
`usage_by_job` | Array&lt;object&gt;
`maintenance_cost_by_equipment` | Array&lt;object&gt;
`leased_equipment` | Array&lt;object&gt;
`scheduled_maintenances` | Array&lt;object&gt;

## Example

```typescript
import type { EquipmentBreakdownResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "category_distribution": null,
  "status_breakdown": null,
  "usage_by_job": null,
  "maintenance_cost_by_equipment": null,
  "leased_equipment": null,
  "scheduled_maintenances": null,
} satisfies EquipmentBreakdownResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EquipmentBreakdownResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


