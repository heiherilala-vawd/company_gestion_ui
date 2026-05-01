# Equipment

## Properties

| Name             | Type                                      |
| ---------------- | ----------------------------------------- |
| `comment`        | string                                    |
| `created_at`     | Date                                      |
| `updated_at`     | Date                                      |
| `created_by`     | [AuditUser](AuditUser.md)                 |
| `updated_by`     | [AuditUser](AuditUser.md)                 |
| `id`             | string                                    |
| `name`           | string                                    |
| `description`    | string                                    |
| `warehouse`      | [CrupdateWarehouse](CrupdateWarehouse.md) |
| `floor_number`   | number                                    |
| `storage_number` | number                                    |

## Example

```typescript
import type { Equipment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  created_at: null,
  updated_at: null,
  created_by: null,
  updated_by: null,
  id: null,
  name: null,
  description: null,
  warehouse: null,
  floor_number: null,
  storage_number: null,
} satisfies Equipment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Equipment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
