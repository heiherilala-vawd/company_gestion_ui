# LoanRepayment

## Properties

| Name                | Type                            |
| ------------------- | ------------------------------- |
| `comment`           | string                          |
| `created_at`        | Date                            |
| `updated_at`        | Date                            |
| `created_by`        | [AuditUser](AuditUser.md)       |
| `updated_by`        | [AuditUser](AuditUser.md)       |
| `id`                | string                          |
| `payment_date`      | Date                            |
| `amount`            | number                          |
| `principal_portion` | number                          |
| `interest_portion`  | number                          |
| `loan`              | [CrupdateLoan](CrupdateLoan.md) |

## Example

```typescript
import type { LoanRepayment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": repayment_001,
  "payment_date": Fri Mar 01 03:00:00 EAT 2024,
  "amount": 600000,
  "principal_portion": 500000,
  "interest_portion": 100000,
  "loan": null,
} satisfies LoanRepayment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LoanRepayment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
