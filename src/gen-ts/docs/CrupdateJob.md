# CrupdateJob

## Properties

| Name                      | Type                      |
| ------------------------- | ------------------------- |
| `comment`                 | string                    |
| `id`                      | string                    |
| `company_id`              | string                    |
| `description`             | string                    |
| `contract_signature_date` | Date                      |
| `start_date`              | Date                      |
| `end_date`                | Date                      |
| `status`                  | [JobStatus](JobStatus.md) |

## Example

```typescript
import type { CrupdateJob } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  id: null,
  company_id: null,
  description: null,
  contract_signature_date: null,
  start_date: null,
  end_date: null,
  status: null,
} satisfies CrupdateJob

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateJob
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
