# CrupdateCompany

## Properties

| Name           | Type                          |
| -------------- | ----------------------------- |
| `comment`      | string                        |
| `id`           | string                        |
| `name`         | string                        |
| `rib`          | string                        |
| `description`  | string                        |
| `company_type` | [CompanyType](CompanyType.md) |

## Example

```typescript
import type { CrupdateCompany } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  id: null,
  name: null,
  rib: null,
  description: null,
  company_type: null,
} satisfies CrupdateCompany

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateCompany
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
