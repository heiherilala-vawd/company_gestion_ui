
# MonetarySummaryResponse


## Properties

Name | Type
------------ | -------------
`total_revenue` | number
`total_expenses` | number
`gross_margin` | number
`expected_revenue` | number
`receivables` | number
`fixed_costs_total` | number
`cash_flow` | object
`cash_accounts` | Array&lt;object&gt;
`active_loans_count` | number

## Example

```typescript
import type { MonetarySummaryResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "total_revenue": null,
  "total_expenses": null,
  "gross_margin": null,
  "expected_revenue": null,
  "receivables": null,
  "fixed_costs_total": null,
  "cash_flow": null,
  "cash_accounts": null,
  "active_loans_count": null,
} satisfies MonetarySummaryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MonetarySummaryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


