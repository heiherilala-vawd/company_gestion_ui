
# IncomeReceipt


## Properties

Name | Type
------------ | -------------
`id` | string
`payment_date` | Date
`amount` | number
`income` | [IncomeMoney](IncomeMoney.md)

## Example

```typescript
import type { IncomeReceipt } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": receipt_001,
  "payment_date": Thu Feb 01 03:00:00 EAT 2024,
  "amount": 150000,
  "income": null,
} satisfies IncomeReceipt

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IncomeReceipt
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


