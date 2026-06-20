
# TravelOperationContainerLine


## Properties

Name | Type
------------ | -------------
`comment` | string
`id` | string
`name` | string
`description` | string
`equipment_lines` | [Array&lt;TravelOperationEquipmentLine&gt;](TravelOperationEquipmentLine.md)
`material_lines` | [Array&lt;TravelOperationMaterialLine&gt;](TravelOperationMaterialLine.md)

## Example

```typescript
import type { TravelOperationContainerLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": tc_010,
  "name": Blue Box,
  "description": Grande boîte plastique,
  "equipment_lines": null,
  "material_lines": null,
} satisfies TravelOperationContainerLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TravelOperationContainerLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


