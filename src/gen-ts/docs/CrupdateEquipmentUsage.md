# CrupdateEquipmentUsage

## Properties

| Name              | Type   |
| ----------------- | ------ |
| `comment`         | string |
| `id`              | string |
| `equipment_id`    | string |
| `job_id`          | string |
| `start_time`      | Date   |
| `end_time`        | Date   |
| `source_location` | string |
| `usage_status`    | string |
| `used_by`         | string |

## Example

```typescript
import type { CrupdateEquipmentUsage } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": eu_001,
  "equipment_id": eq_001,
  "job_id": job_001,
  "start_time": 2024-06-10T08:00Z,
  "end_time": 2024-06-10T17:00Z,
  "source_location": wh_001,
  "usage_status": COMPLETED,
  "used_by": user_001,
} satisfies CrupdateEquipmentUsage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateEquipmentUsage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
