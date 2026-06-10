
# CrupdatePurchaseOrderLine


## Properties

Name | Type
------------ | -------------
`id` | string
`purchase_order_id` | string
`material_id` | string
`quantity` | number
`unit_price` | number
`comment` | string

## Example

```typescript
import type { CrupdatePurchaseOrderLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchase_order_id": null,
  "material_id": null,
  "quantity": null,
  "unit_price": null,
  "comment": null,
} satisfies CrupdatePurchaseOrderLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdatePurchaseOrderLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


