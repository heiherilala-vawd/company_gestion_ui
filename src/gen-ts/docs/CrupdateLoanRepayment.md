# CrupdateLoanRepayment

## Properties

| Name           | Type   |
| -------------- | ------ |
| `id`           | string |
| `payment_date` | Date   |
| `amount`       | number |
| `loan_id`      | string |
| `comment`      | string |

## Example

```typescript
import type { CrupdateLoanRepayment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": repayment_001,
  "payment_date": Fri Mar 01 03:00:00 EAT 2024,
  "amount": 600000,
  "loan_id": loan_001,
  "comment": Remboursement mars 2024,
} satisfies CrupdateLoanRepayment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateLoanRepayment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
