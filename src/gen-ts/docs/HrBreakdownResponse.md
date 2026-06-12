# HrBreakdownResponse

## Properties

| Name                      | Type                |
| ------------------------- | ------------------- |
| `employees_by_department` | Array&lt;object&gt; |
| `leave_days_by_type`      | Array&lt;object&gt; |
| `leave_by_status`         | Array&lt;object&gt; |
| `employees_by_job`        | Array&lt;object&gt; |
| `labor_cost_by_job`       | Array&lt;object&gt; |
| `payroll_by_type`         | Array&lt;object&gt; |
| `leave_balances`          | Array&lt;object&gt; |

## Example

```typescript
import type { HrBreakdownResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  employees_by_department: null,
  leave_days_by_type: null,
  leave_by_status: null,
  employees_by_job: null,
  labor_cost_by_job: null,
  payroll_by_type: null,
  leave_balances: null,
} satisfies HrBreakdownResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HrBreakdownResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
