# Department

## Properties

| Name            | Type   |
| --------------- | ------ |
| `id`            | string |
| `name`          | string |
| `description`   | string |
| `company_id`    | string |
| `birth_date`    | Date   |
| `manager_id`    | string |
| `department_id` | string |

## Example

```typescript
import type { Department } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": dept_001,
  "name": Génie Civil,
  "description": Département en charge des travaux de génie civil,
  "company_id": comp_001,
  "birth_date": Tue May 15 03:00:00 EAT 1990,
  "manager_id": usr_admin001,
  "department_id": dept_001,
} satisfies Department

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Department
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
