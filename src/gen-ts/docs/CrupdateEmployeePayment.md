
# CrupdateEmployeePayment


## Properties

Name | Type
------------ | -------------
`id` | string
`expense` | [CrupdateExpenseMoney](CrupdateExpenseMoney.md)
`employee_id` | string
`payment_description` | string
`payment_type` | [PaymentType](PaymentType.md)

## Example

```typescript
import type { CrupdateEmployeePayment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": emp_pay_001,
  "expense": null,
  "employee_id": usr_123456,
  "payment_description": Salaire février 2024,
  "payment_type": null,
} satisfies CrupdateEmployeePayment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateEmployeePayment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


