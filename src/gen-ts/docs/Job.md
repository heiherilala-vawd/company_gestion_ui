# Job

## Properties

| Name                      | Type                                  |
| ------------------------- | ------------------------------------- |
| `comment`                 | string                                |
| `created_at`              | Date                                  |
| `updated_at`              | Date                                  |
| `created_by`              | [AuditUser](AuditUser.md)             |
| `updated_by`              | [AuditUser](AuditUser.md)             |
| `id`                      | string                                |
| `company`                 | [CrupdateCompany](CrupdateCompany.md) |
| `description`             | string                                |
| `contract_signature_date` | Date                                  |
| `start_date`              | Date                                  |
| `end_date`                | Date                                  |
| `status`                  | [JobStatus](JobStatus.md)             |

## Example

```typescript
import type { Job } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  created_at: null,
  updated_at: null,
  created_by: null,
  updated_by: null,
  id: null,
  company: null,
  description: null,
  contract_signature_date: null,
  start_date: null,
  end_date: null,
  status: null,
} satisfies Job

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Job
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
