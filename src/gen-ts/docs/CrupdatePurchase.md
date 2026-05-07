
# CrupdatePurchase


## Properties

Name | Type
------------ | -------------
`id` | string
`expense` | [CrupdateExpenseMoney](CrupdateExpenseMoney.md)
`supplier` | [CrupdateWarehouse](CrupdateWarehouse.md)
`equipment` | string
`material` | string
`quantity` | number
`is_equipment` | boolean

## Example

```typescript
import type { CrupdatePurchase } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": purch_001,
  "expense": null,
  "supplier": null,
  "equipment": eq_001,
  "material": mat_001,
  "quantity": 200,
  "is_equipment": false,
} satisfies CrupdatePurchase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdatePurchase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


