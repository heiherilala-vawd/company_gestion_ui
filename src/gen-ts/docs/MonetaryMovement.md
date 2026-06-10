
# MonetaryMovement


## Properties

Name | Type
------------ | -------------
`amount` | number
`description` | string

## Example

```typescript
import type { MonetaryMovement } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "amount": 15000,
  "description": Achat de matériaux pour le chantier,
} satisfies MonetaryMovement

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MonetaryMovement
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


