# TaskSchedule

## Properties

| Name                | Type                                |
| ------------------- | ----------------------------------- |
| `comment`           | string                              |
| `created_at`        | Date                                |
| `updated_at`        | Date                                |
| `created_by`        | [AuditUser](AuditUser.md)           |
| `updated_by`        | [AuditUser](AuditUser.md)           |
| `id`                | string                              |
| `title`             | string                              |
| `description`       | string                              |
| `priority`          | [TaskPriority](TaskPriority.md)     |
| `frequency`         | string                              |
| `scheduled_date`    | Date                                |
| `status`            | [ScheduleStatus](ScheduleStatus.md) |
| `company_id`        | string                              |
| `assigned_user_ids` | Array&lt;string&gt;                 |

## Example

```typescript
import type { TaskSchedule } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": schedule_001,
  "title": Maintenance équipement,
  "description": Maintenance mensuelle des équipements,
  "priority": null,
  "frequency": 0 0 8 1 * ?,
  "scheduled_date": Wed Jul 01 03:00:00 EAT 2026,
  "status": null,
  "company_id": comp_btp001,
  "assigned_user_ids": ["usr_123456","usr_789012"],
} satisfies TaskSchedule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TaskSchedule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
