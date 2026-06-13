
# CrupdateOrganization


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`address` | string
`email` | string
`phone` | string
`contact_name` | string
`company_id` | string
`comment` | string

## Example

```typescript
import type { CrupdateOrganization } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": org_001,
  "name": Acme Corp,
  "address": 123 Main Street, City,
  "email": contact@acme.com,
  "phone": +261 12 345 6789,
  "contact_name": John Doe,
  "company_id": comp_btp001,
  "comment": null,
} satisfies CrupdateOrganization

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateOrganization
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


