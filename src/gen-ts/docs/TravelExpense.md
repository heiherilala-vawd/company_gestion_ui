# TravelExpense

## Properties

| Name                 | Type                                            |
| -------------------- | ----------------------------------------------- |
| `id`                 | string                                          |
| `expense`            | [CrupdateExpenseMoney](CrupdateExpenseMoney.md) |
| `departure_location` | [CrupdateWarehouse](CrupdateWarehouse.md)       |
| `arrival_location`   | [CrupdateWarehouse](CrupdateWarehouse.md)       |
| `departure_date`     | Date                                            |
| `arrival_date`       | Date                                            |

## Example

```typescript
import type { TravelExpense } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": travel_001,
  "expense": null,
  "departure_location": null,
  "arrival_location": null,
  "departure_date": 2024-02-20T08:00Z,
  "arrival_date": 2024-02-20T18:00Z,
} satisfies TravelExpense

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TravelExpense
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
