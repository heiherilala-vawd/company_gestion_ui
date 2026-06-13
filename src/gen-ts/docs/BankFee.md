
# BankFee


## Properties

Name | Type
------------ | -------------
`id` | string
`expense` | [CrupdateExpenseMoney](CrupdateExpenseMoney.md)
`bank_name` | string
`description` | string

## Example

```typescript
import type { BankFee } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": bank_001,
  "expense": null,
  "bank_name": BNP Paribas,
  "description": Frais de virement international,
} satisfies BankFee

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BankFee
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


