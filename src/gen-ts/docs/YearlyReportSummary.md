# YearlyReportSummary

## Properties

| Name                    | Type   |
| ----------------------- | ------ |
| `total_income`          | number |
| `total_expense`         | number |
| `net_profit`            | number |
| `job_count`             | number |
| `in_progress_job_count` | number |

## Example

```typescript
import type { YearlyReportSummary } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  total_income: 2000000,
  total_expense: 1500000,
  net_profit: 500000,
  job_count: 15,
  in_progress_job_count: 3,
} satisfies YearlyReportSummary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as YearlyReportSummary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
