
# HrDashboardResponse


## Properties

Name | Type
------------ | -------------
`total_employees` | number
`employees_by_department` | Array&lt;object&gt;
`leave_summary` | object
`payroll_total` | number
`payroll_by_type` | Array&lt;object&gt;
`new_hires` | number
`leave_balances` | Array&lt;object&gt;
`tasks_by_priority` | Array&lt;object&gt;
`tasks_completed` | number
`employees_by_job` | Array&lt;object&gt;
`labor_cost_by_job` | Array&lt;object&gt;

## Example

```typescript
import type { HrDashboardResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "total_employees": null,
  "employees_by_department": null,
  "leave_summary": null,
  "payroll_total": null,
  "payroll_by_type": null,
  "new_hires": null,
  "leave_balances": null,
  "tasks_by_priority": null,
  "tasks_completed": null,
  "employees_by_job": null,
  "labor_cost_by_job": null,
} satisfies HrDashboardResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HrDashboardResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


