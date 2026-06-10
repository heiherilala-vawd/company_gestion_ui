
# Warehouse


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`job` | [CrupdateJob](CrupdateJob.md)

## Example

```typescript
import type { Warehouse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": wh_001,
  "name": Entrepôt Nord,
  "description": Entrepôt principal pour le chantier de Lyon,
  "job": null,
} satisfies Warehouse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Warehouse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


