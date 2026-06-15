# CrupdateIncomeReceipt

## Properties

| Name           | Type   |
| -------------- | ------ |
| `id`           | string |
| `payment_date` | Date   |
| `amount`       | number |
| `income_id`    | string |
| `comment`      | string |

## Example

```typescript
import type { CrupdateIncomeReceipt } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": receipt_001,
  "payment_date": Thu Feb 01 03:00:00 EAT 2024,
  "amount": 150000,
  "income_id": inc_001,
  "comment": Paiement recu le 1er fevrier,
} satisfies CrupdateIncomeReceipt

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateIncomeReceipt
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
