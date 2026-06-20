
# PurchaseOrder


## Properties

Name | Type
------------ | -------------
`comment` | string
`created_at` | Date
`updated_at` | Date
`created_by` | [AuditUser](AuditUser.md)
`updated_by` | [AuditUser](AuditUser.md)
`id` | string
`supplier` | [Supplier](Supplier.md)
`order_date` | Date
`status` | [PurchaseOrderStatus](PurchaseOrderStatus.md)
`total_amount` | number
`company` | [CrupdateCompany](CrupdateCompany.md)
`job` | [CrupdateJob](CrupdateJob.md)
`lines` | [Array&lt;PurchaseOrderLine&gt;](PurchaseOrderLine.md)

## Example

```typescript
import type { PurchaseOrder } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": po_001,
  "supplier": null,
  "order_date": Mon May 25 03:00:00 EAT 2026,
  "status": null,
  "total_amount": 5000.0,
  "company": null,
  "job": null,
  "lines": null,
} satisfies PurchaseOrder

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PurchaseOrder
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


