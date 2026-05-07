
# JobWithFinancials


## Properties

Name | Type
------------ | -------------
`job` | [Job](Job.md)
`total_income` | number
`total_expense` | number
`net_profit` | number

## Example

```typescript
import type { JobWithFinancials } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "job": null,
  "total_income": 500000,
  "total_expense": 350000,
  "net_profit": 150000,
} satisfies JobWithFinancials

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobWithFinancials
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


