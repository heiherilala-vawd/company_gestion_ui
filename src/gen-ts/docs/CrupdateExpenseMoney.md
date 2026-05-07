
# CrupdateExpenseMoney


## Properties

Name | Type
------------ | -------------
`comment` | string
`amount` | number
`description` | string
`id` | string
`job_id` | string

## Example

```typescript
import type { CrupdateExpenseMoney } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "amount": 15000,
  "description": Achat de matériaux pour le chantier,
  "id": exp_001,
  "job_id": job_001,
} satisfies CrupdateExpenseMoney

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateExpenseMoney
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


