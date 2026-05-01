# User

## Properties

| Name         | Type                      |
| ------------ | ------------------------- |
| `comment`    | string                    |
| `created_at` | Date                      |
| `updated_at` | Date                      |
| `created_by` | [AuditUser](AuditUser.md) |
| `updated_by` | [AuditUser](AuditUser.md) |
| `id`         | string                    |
| `role`       | [Role](Role.md)           |
| `first_name` | string                    |
| `last_name`  | string                    |
| `sex`        | [Sex](Sex.md)             |
| `email`      | string                    |

## Example

```typescript
import type { User } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  created_at: null,
  updated_at: null,
  created_by: null,
  updated_by: null,
  id: null,
  role: null,
  first_name: null,
  last_name: null,
  sex: null,
  email: null,
} satisfies User

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as User
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
