# CrupdateLoan

## Properties

| Name            | Type   |
| --------------- | ------ |
| `comment`       | string |
| `amount`        | number |
| `description`   | string |
| `id`            | string |
| `lender`        | string |
| `interest_rate` | number |
| `start_date`    | Date   |
| `due_date`      | Date   |
| `job_id`        | string |

## Example

```typescript
import type { CrupdateLoan } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "amount": 15000,
  "description": Achat de matériaux pour le chantier,
  "id": loan_001,
  "lender": BNI Madagascar,
  "interest_rate": 1200,
  "start_date": Thu Feb 01 03:00:00 EAT 2024,
  "due_date": Thu Dec 31 03:00:00 EAT 2026,
  "job_id": job_001,
} satisfies CrupdateLoan

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateLoan
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
