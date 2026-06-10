
# Material


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`unit_price` | number
`unit` | [MaterialUnit](MaterialUnit.md)
`company_id` | string
`material_warehouses` | [Array&lt;MaterialWarehouseInfo&gt;](MaterialWarehouseInfo.md)

## Example

```typescript
import type { Material } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": mat_001,
  "name": Ciment Portland,
  "description": Ciment Portland de qualité supérieure pour béton armé,
  "unit_price": 12.5,
  "unit": null,
  "company_id": comp_001,
  "material_warehouses": null,
} satisfies Material

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Material
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


