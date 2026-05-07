
# TravelOperationEquipmentLine


## Properties

Name | Type
------------ | -------------
`comment` | string
`id` | string
`equipment` | [CrupdateEquipment](CrupdateEquipment.md)

## Example

```typescript
import type { TravelOperationEquipmentLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": travel_eq_010,
  "equipment": null,
} satisfies TravelOperationEquipmentLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TravelOperationEquipmentLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


