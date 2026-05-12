# Loan

## Properties

| Name               | Type                                           |
| ------------------ | ---------------------------------------------- |
| `comment`          | string                                         |
| `created_at`       | Date                                           |
| `updated_at`       | Date                                           |
| `created_by`       | [AuditUser](AuditUser.md)                      |
| `updated_by`       | [AuditUser](AuditUser.md)                      |
| `amount`           | number                                         |
| `description`      | string                                         |
| `id`               | string                                         |
| `lender`           | string                                         |
| `interest_rate`    | number                                         |
| `start_date`       | Date                                           |
| `due_date`         | Date                                           |
| `status`           | [LoanStatus](LoanStatus.md)                    |
| `job`              | [CrupdateJob](CrupdateJob.md)                  |
| `repayments`       | [Array&lt;LoanRepayment&gt;](LoanRepayment.md) |
| `remaining_amount` | number                                         |

## Example

```typescript
import type { Loan } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "amount": 15000,
  "description": Achat de matériaux pour le chantier,
  "id": loan_001,
  "lender": BNI Madagascar,
  "interest_rate": 1200,
  "start_date": Thu Feb 01 03:00:00 EAT 2024,
  "due_date": Thu Dec 31 03:00:00 EAT 2026,
  "status": null,
  "job": null,
  "repayments": null,
  "remaining_amount": 3800000,
} satisfies Loan

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Loan
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
