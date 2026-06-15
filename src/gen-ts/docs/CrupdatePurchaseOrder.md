# CrupdatePurchaseOrder

## Properties

| Name           | Type                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| `id`           | string                                                                 |
| `supplier_id`  | string                                                                 |
| `order_date`   | Date                                                                   |
| `status`       | [PurchaseOrderStatus](PurchaseOrderStatus.md)                          |
| `total_amount` | number                                                                 |
| `company_id`   | string                                                                 |
| `job_id`       | string                                                                 |
| `lines`        | [Array&lt;CrupdatePurchaseOrderLine&gt;](CrupdatePurchaseOrderLine.md) |
| `comment`      | string                                                                 |

## Example

```typescript
import type { CrupdatePurchaseOrder } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": po_001,
  "supplier_id": supplier_001,
  "order_date": Mon May 25 03:00:00 EAT 2026,
  "status": null,
  "total_amount": 5000.0,
  "company_id": comp_btp001,
  "job_id": job_001,
  "lines": null,
  "comment": null,
} satisfies CrupdatePurchaseOrder

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdatePurchaseOrder
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
