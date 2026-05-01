# CrupdateIncomeMoney

## Properties

| Name                  | Type   |
| --------------------- | ------ |
| `comment`             | string |
| `amount`              | number |
| `description`         | string |
| `id`                  | string |
| `source_organization` | string |
| `invoice_reference`   | string |
| `job_id`              | string |

## Example

```typescript
import type { CrupdateIncomeMoney } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  amount: null,
  description: null,
  id: null,
  source_organization: null,
  invoice_reference: null,
  job_id: null,
} satisfies CrupdateIncomeMoney

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateIncomeMoney
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
