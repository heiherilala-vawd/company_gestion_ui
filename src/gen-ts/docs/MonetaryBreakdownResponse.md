# MonetaryBreakdownResponse

## Properties

| Name                   | Type                |
| ---------------------- | ------------------- |
| `expenses_by_type`     | Array&lt;object&gt; |
| `budget_vs_actual`     | Array&lt;object&gt; |
| `expected_vs_actual`   | Array&lt;object&gt; |
| `revenue_by_job`       | Array&lt;object&gt; |
| `expense_by_job`       | Array&lt;object&gt; |
| `profitability_by_job` | Array&lt;object&gt; |
| `active_loans`         | Array&lt;object&gt; |

## Example

```typescript
import type { MonetaryBreakdownResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  expenses_by_type: null,
  budget_vs_actual: null,
  expected_vs_actual: null,
  revenue_by_job: null,
  expense_by_job: null,
  profitability_by_job: null,
  active_loans: null,
} satisfies MonetaryBreakdownResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MonetaryBreakdownResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
