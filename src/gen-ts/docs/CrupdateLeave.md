# CrupdateLeave

## Properties

| Name            | Type                          |
| --------------- | ----------------------------- |
| `id`            | string                        |
| `user_id`       | string                        |
| `leave_type_id` | string                        |
| `start_date`    | Date                          |
| `end_date`      | Date                          |
| `duration_days` | number                        |
| `status`        | [LeaveStatus](LeaveStatus.md) |
| `reason`        | string                        |
| `comment`       | string                        |

## Example

```typescript
import type { CrupdateLeave } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": leave_1,
  "user_id": usr_123456,
  "leave_type_id": leave_type_1,
  "start_date": Mon Jun 01 03:00:00 EAT 2026,
  "end_date": Mon Jun 15 03:00:00 EAT 2026,
  "duration_days": 11.0,
  "status": null,
  "reason": Vacances annuelles,
  "comment": null,
} satisfies CrupdateLeave

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateLeave
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
