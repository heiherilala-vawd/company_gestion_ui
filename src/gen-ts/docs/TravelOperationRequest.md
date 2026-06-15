# TravelOperationRequest

## Properties

| Name              | Type                                                                         |
| ----------------- | ---------------------------------------------------------------------------- |
| `comment`         | string                                                                       |
| `travel`          | [TravelOperationTravel](TravelOperationTravel.md)                            |
| `equipment_lines` | [Array&lt;TravelOperationEquipmentLine&gt;](TravelOperationEquipmentLine.md) |
| `material_lines`  | [Array&lt;TravelOperationMaterialLine&gt;](TravelOperationMaterialLine.md)   |
| `people_lines`    | [Array&lt;TravelOperationPeopleLine&gt;](TravelOperationPeopleLine.md)       |

## Example

```typescript
import type { TravelOperationRequest } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "travel": null,
  "equipment_lines": null,
  "material_lines": null,
  "people_lines": null,
} satisfies TravelOperationRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TravelOperationRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
