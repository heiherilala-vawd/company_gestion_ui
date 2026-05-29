# CrupdateTaskSchedule

## Properties

| Name                | Type                            |
| ------------------- | ------------------------------- |
| `id`                | string                          |
| `title`             | string                          |
| `description`       | string                          |
| `priority`          | [TaskPriority](TaskPriority.md) |
| `frequency`         | string                          |
| `scheduled_date`    | Date                            |
| `company_id`        | string                          |
| `assigned_user_ids` | Array&lt;string&gt;             |
| `comment`           | string                          |

## Example

```typescript
import type { CrupdateTaskSchedule } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": schedule_001,
  "title": Maintenance équipement,
  "description": Maintenance mensuelle des équipements,
  "priority": null,
  "frequency": 0 0 8 1 * ?,
  "scheduled_date": Wed Jul 01 03:00:00 EAT 2026,
  "company_id": comp_btp001,
  "assigned_user_ids": ["usr_123456","usr_789012"],
  "comment": null,
} satisfies CrupdateTaskSchedule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateTaskSchedule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
