
# YearlyReport


## Properties

Name | Type
------------ | -------------
`year` | number
`jobs_with_financials` | [Array&lt;JobWithFinancials&gt;](JobWithFinancials.md)
`summary` | [YearlyReportSummary](YearlyReportSummary.md)

## Example

```typescript
import type { YearlyReport } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "year": 2024,
  "jobs_with_financials": null,
  "summary": null,
} satisfies YearlyReport

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as YearlyReport
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


