# Leave

## Properties

| Name            | Type                            |
| --------------- | ------------------------------- |
| `comment`       | string                          |
| `created_at`    | Date                            |
| `updated_at`    | Date                            |
| `created_by`    | [AuditUser](AuditUser.md)       |
| `updated_by`    | [AuditUser](AuditUser.md)       |
| `id`            | string                          |
| `user`          | [CrupdateUser](CrupdateUser.md) |
| `leave_type`    | [LeaveType](LeaveType.md)       |
| `start_date`    | Date                            |
| `end_date`      | Date                            |
| `duration_days` | number                          |
| `status`        | [LeaveStatus](LeaveStatus.md)   |
| `reason`        | string                          |
| `approved_by`   | [CrupdateUser](CrupdateUser.md) |
| `approved_at`   | Date                            |

## Example

```typescript
import type { Leave } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": leave_1,
  "user": null,
  "leave_type": null,
  "start_date": Mon Jun 01 03:00:00 EAT 2026,
  "end_date": Mon Jun 15 03:00:00 EAT 2026,
  "duration_days": 11.0,
  "status": null,
  "reason": Vacances annuelles,
  "approved_by": null,
  "approved_at": 2026-05-20T10:00Z,
} satisfies Leave

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Leave
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
