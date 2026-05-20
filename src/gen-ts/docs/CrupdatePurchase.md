# CrupdatePurchase

## Properties

| Name           | Type                                            |
| -------------- | ----------------------------------------------- |
| `id`           | string                                          |
| `expense`      | [CrupdateExpenseMoney](CrupdateExpenseMoney.md) |
| `supplier`     | [CrupdateWarehouse](CrupdateWarehouse.md)       |
| `equipment`    | string                                          |
| `material`     | string                                          |
| `quantity`     | number                                          |
| `is_equipment` | boolean                                         |
| `invoice_date` | Date                                            |
| `due_date`     | Date                                            |
| `paid_at`      | Date                                            |

## Example

```typescript
import type { CrupdatePurchase } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": purch_001,
  "expense": null,
  "supplier": null,
  "equipment": eq_001,
  "material": mat_001,
  "quantity": 200,
  "is_equipment": false,
  "invoice_date": Mon Jan 15 03:00:00 EAT 2024,
  "due_date": Thu Feb 15 03:00:00 EAT 2024,
  "paid_at": Sat Feb 10 03:00:00 EAT 2024,
} satisfies CrupdatePurchase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdatePurchase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
