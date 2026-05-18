# IncomeMoney

## Properties

| Name                  | Type                                           |
| --------------------- | ---------------------------------------------- |
| `comment`             | string                                         |
| `created_at`          | Date                                           |
| `updated_at`          | Date                                           |
| `created_by`          | [AuditUser](AuditUser.md)                      |
| `updated_by`          | [AuditUser](AuditUser.md)                      |
| `amount`              | number                                         |
| `description`         | string                                         |
| `id`                  | string                                         |
| `source_organization` | string                                         |
| `invoice_reference`   | string                                         |
| `billing_start_date`  | Date                                           |
| `facturation_date`    | Date                                           |
| `job`                 | [CrupdateJob](CrupdateJob.md)                  |
| `income_type`         | [IncomeType](IncomeType.md)                    |
| `receipts`            | [Array&lt;IncomeReceipt&gt;](IncomeReceipt.md) |
| `remaining_amount`    | number                                         |

## Example

```typescript
import type { IncomeMoney } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "amount": 15000,
  "description": Achat de matériaux pour le chantier,
  "id": inc_001,
  "source_organization": Client Principal,
  "invoice_reference": FACT-2024-001,
  "billing_start_date": Mon Jan 15 03:00:00 EAT 2024,
  "facturation_date": 2024-01-10T08:00Z,
  "job": null,
  "income_type": null,
  "receipts": null,
  "remaining_amount": 50000,
} satisfies IncomeMoney

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IncomeMoney
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
