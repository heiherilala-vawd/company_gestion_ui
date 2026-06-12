# MonetaryDashboardResponse

## Properties

| Name                   | Type                |
| ---------------------- | ------------------- |
| `total_revenue`        | number              |
| `total_expenses`       | number              |
| `gross_margin`         | number              |
| `expected_revenue`     | number              |
| `expected_vs_actual`   | Array&lt;object&gt; |
| `receivables`          | number              |
| `cash_accounts`        | Array&lt;object&gt; |
| `cash_flow`            | object              |
| `expenses_by_type`     | Array&lt;object&gt; |
| `budget_vs_actual`     | Array&lt;object&gt; |
| `active_loans`         | Array&lt;object&gt; |
| `fixed_costs_total`    | number              |
| `profitability_by_job` | Array&lt;object&gt; |
| `revenue_by_job`       | Array&lt;object&gt; |
| `expense_by_job`       | Array&lt;object&gt; |

## Example

```typescript
import type { MonetaryDashboardResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  total_revenue: null,
  total_expenses: null,
  gross_margin: null,
  expected_revenue: null,
  expected_vs_actual: null,
  receivables: null,
  cash_accounts: null,
  cash_flow: null,
  expenses_by_type: null,
  budget_vs_actual: null,
  active_loans: null,
  fixed_costs_total: null,
  profitability_by_job: null,
  revenue_by_job: null,
  expense_by_job: null,
} satisfies MonetaryDashboardResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MonetaryDashboardResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
