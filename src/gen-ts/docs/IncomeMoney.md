# IncomeMoney

## Properties

| Name                  | Type                          |
| --------------------- | ----------------------------- |
| `comment`             | string                        |
| `created_at`          | Date                          |
| `updated_at`          | Date                          |
| `created_by`          | [AuditUser](AuditUser.md)     |
| `updated_by`          | [AuditUser](AuditUser.md)     |
| `amount`              | number                        |
| `description`         | string                        |
| `id`                  | string                        |
| `source_organization` | string                        |
| `invoice_reference`   | string                        |
| `job`                 | [CrupdateJob](CrupdateJob.md) |

## Example

```typescript
import type { IncomeMoney } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  created_at: null,
  updated_at: null,
  created_by: null,
  updated_by: null,
  amount: null,
  description: null,
  id: null,
  source_organization: null,
  invoice_reference: null,
  job: null,
} satisfies IncomeMoney

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IncomeMoney
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
