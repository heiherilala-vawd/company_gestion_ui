# HrSummaryResponse

## Properties

| Name                  | Type   |
| --------------------- | ------ |
| `total_employees`     | number |
| `new_hires`           | number |
| `payroll_total`       | number |
| `tasks_completed`     | number |
| `leave_days_approved` | number |
| `absence_rate`        | number |

## Example

```typescript
import type { HrSummaryResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  total_employees: null,
  new_hires: null,
  payroll_total: null,
  tasks_completed: null,
  leave_days_approved: null,
  absence_rate: null,
} satisfies HrSummaryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HrSummaryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
