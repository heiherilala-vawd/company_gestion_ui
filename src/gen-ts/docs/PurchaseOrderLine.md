
# PurchaseOrderLine


## Properties

Name | Type
------------ | -------------
`id` | string
`material` | [CrupdateMaterial](CrupdateMaterial.md)
`quantity` | number
`unit_price` | number

## Example

```typescript
import type { PurchaseOrderLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "material": null,
  "quantity": null,
  "unit_price": null,
} satisfies PurchaseOrderLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PurchaseOrderLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


