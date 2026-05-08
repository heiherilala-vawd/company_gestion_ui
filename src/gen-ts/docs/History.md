# History

## Properties

| Name             | Type                        |
| ---------------- | --------------------------- |
| `id`             | string                      |
| `previous_value` | string                      |
| `new_value`      | string                      |
| `user_id`        | string                      |
| `modified_at`    | Date                        |
| `entity_type`    | [EntityType](EntityType.md) |
| `entity_id`      | string                      |

## Example

```typescript
import type { History } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": hist_001,
  "previous_value": {"status":"PENDING_SIGNATURE"},
  "new_value": {"status":"IN_PROGRESS"},
  "user_id": usr_123456,
  "modified_at": 2024-02-01T09:00Z,
  "entity_type": null,
  "entity_id": job_001,
} satisfies History

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as History
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
