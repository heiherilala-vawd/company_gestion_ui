# PurchaseOperationRequest

## Properties

| Name              | Type                                                                             |
| ----------------- | -------------------------------------------------------------------------------- |
| `comment`         | string                                                                           |
| `equipment_lines` | [Array&lt;PurchaseOperationEquipmentLine&gt;](PurchaseOperationEquipmentLine.md) |
| `material_lines`  | [Array&lt;PurchaseOperationMaterialLine&gt;](PurchaseOperationMaterialLine.md)   |
| `travel`          | [PurchaseOperationTravel](PurchaseOperationTravel.md)                            |

## Example

```typescript
import type { PurchaseOperationRequest } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "equipment_lines": null,
  "material_lines": null,
  "travel": null,
} satisfies PurchaseOperationRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PurchaseOperationRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
