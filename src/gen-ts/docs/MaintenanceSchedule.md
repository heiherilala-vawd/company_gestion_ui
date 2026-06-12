# MaintenanceSchedule

## Properties

| Name             | Type                                                      |
| ---------------- | --------------------------------------------------------- |
| `id`             | string                                                    |
| `equipment_id`   | string                                                    |
| `description`    | string                                                    |
| `scheduled_date` | Date                                                      |
| `frequency`      | string                                                    |
| `status`         | [MaintenanceScheduleStatus](MaintenanceScheduleStatus.md) |
| `company_id`     | string                                                    |

## Example

```typescript
import type { MaintenanceSchedule } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  id: null,
  equipment_id: null,
  description: null,
  scheduled_date: null,
  frequency: null,
  status: null,
  company_id: null,
} satisfies MaintenanceSchedule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MaintenanceSchedule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
