# IncomeMoney

## Properties

| Name                  | Type                                           |
| --------------------- | ---------------------------------------------- |
| `amount`              | number                                         |
| `description`         | string                                         |
| `id`                  | string                                         |
| `source_organization` | string                                         |
| `invoice_reference`   | string                                         |
| `billing_start_date`  | Date                                           |
| `facturation_date`    | Date                                           |
| `due_date`            | Date                                           |
| `payment_terms`       | string                                         |
| `job`                 | [CrupdateJob](CrupdateJob.md)                  |
| `income_type`         | [IncomeType](IncomeType.md)                    |
| `receipts`            | [Array&lt;IncomeReceipt&gt;](IncomeReceipt.md) |
| `remaining_amount`    | number                                         |

## Example

```typescript
import type { IncomeMoney } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "amount": 15000,
  "description": Achat de matériaux pour le chantier,
  "id": inc_001,
  "source_organization": Client Principal,
  "invoice_reference": FACT-2024-001,
  "billing_start_date": Mon Jan 15 03:00:00 EAT 2024,
  "facturation_date": 2024-01-10T08:00Z,
  "due_date": Thu Feb 15 03:00:00 EAT 2024,
  "payment_terms": NET-30,
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
