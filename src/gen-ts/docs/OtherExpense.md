# OtherExpense

## Properties

| Name                 | Type                                            |
| -------------------- | ----------------------------------------------- |
| `id`                 | string                                          |
| `expense`            | [CrupdateExpenseMoney](CrupdateExpenseMoney.md) |
| `other_expense_type` | [OtherExpenseType](OtherExpenseType.md)         |
| `description`        | string                                          |

## Example

```typescript
import type { OtherExpense } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": other_001,
  "expense": null,
  "other_expense_type": null,
  "description": Frais de carburant pour grues,
} satisfies OtherExpense

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OtherExpense
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
