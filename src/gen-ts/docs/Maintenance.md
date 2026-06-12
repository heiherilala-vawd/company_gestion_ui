# Maintenance

## Properties

| Name           | Type                                            |
| -------------- | ----------------------------------------------- |
| `id`           | string                                          |
| `expense`      | [CrupdateExpenseMoney](CrupdateExpenseMoney.md) |
| `equipment_id` | string                                          |
| `description`  | string                                          |

## Example

```typescript
import type { Maintenance } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": maint_001,
  "expense": null,
  "equipment_id": eq_001,
  "description": Révision moteur périodique,
} satisfies Maintenance

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Maintenance
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
