
# CrupdateSupplier


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`siret` | string
`address` | string
`email` | string
`company_id` | string
`phone` | string
`contact_name` | string
`comment` | string

## Example

```typescript
import type { CrupdateSupplier } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": supplier_001,
  "name": Fournitures BTP SARL,
  "siret": 12345678901234,
  "address": 12 Rue des Usines, 75001 Paris,
  "email": contact@fournitures-btp.fr,
  "company_id": comp_btp001,
  "phone": 01 23 45 67 89,
  "contact_name": Jean Dupont,
  "comment": null,
} satisfies CrupdateSupplier

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateSupplier
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


