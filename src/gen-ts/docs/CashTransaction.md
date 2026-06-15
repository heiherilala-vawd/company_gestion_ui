# CashTransaction

## Properties

| Name               | Type                                          |
| ------------------ | --------------------------------------------- |
| `comment`          | string                                        |
| `created_at`       | Date                                          |
| `updated_at`       | Date                                          |
| `created_by`       | [AuditUser](AuditUser.md)                     |
| `updated_by`       | [AuditUser](AuditUser.md)                     |
| `id`               | string                                        |
| `cash_account_id`  | string                                        |
| `amount`           | number                                        |
| `transaction_date` | Date                                          |
| `description`      | string                                        |
| `type`             | [CashTransactionType](CashTransactionType.md) |

## Example

```typescript
import type { CashTransaction } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": ct_001,
  "cash_account_id": ca_001,
  "amount": 500000.0,
  "transaction_date": Sat Jun 15 03:00:00 EAT 2024,
  "description": Dépôt chèque client,
  "type": null,
} satisfies CashTransaction

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CashTransaction
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
