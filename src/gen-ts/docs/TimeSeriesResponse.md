
# TimeSeriesResponse


## Properties

Name | Type
------------ | -------------
`schema` | string
`period` | [TimeSeriesResponsePeriod](TimeSeriesResponsePeriod.md)
`granularity` | string
`intervals` | [Array&lt;TimeSeriesResponseIntervalsInner&gt;](TimeSeriesResponseIntervalsInner.md)
`cumulative` | Array&lt;number&gt;
`total` | number
`filtered_by_job` | string

## Example

```typescript
import type { TimeSeriesResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "schema": null,
  "period": null,
  "granularity": null,
  "intervals": null,
  "cumulative": null,
  "total": null,
  "filtered_by_job": null,
} satisfies TimeSeriesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimeSeriesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


