# TravelPeople

## Properties

| Name               | Type                                              |
| ------------------ | ------------------------------------------------- |
| `id`               | string                                            |
| `travel`           | [CrupdateTravelExpense](CrupdateTravelExpense.md) |
| `user`             | [User](User.md)                                   |
| `arrival_date`     | Date                                              |
| `arrival_location` | [CrupdateWarehouse](CrupdateWarehouse.md)         |

## Example

```typescript
import type { TravelPeople } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": tp_001,
  "travel": null,
  "user": null,
  "arrival_date": 2024-02-20T18:00Z,
  "arrival_location": null,
} satisfies TravelPeople

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TravelPeople
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
