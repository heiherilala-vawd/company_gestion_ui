# Equipment

## Properties

| Name             | Type                                       |
| ---------------- | ------------------------------------------ |
| `comment`        | string                                     |
| `created_at`     | Date                                       |
| `updated_at`     | Date                                       |
| `created_by`     | [AuditUser](AuditUser.md)                  |
| `updated_by`     | [AuditUser](AuditUser.md)                  |
| `id`             | string                                     |
| `name`           | string                                     |
| `description`    | string                                     |
| `warehouse`      | [CrupdateWarehouse](CrupdateWarehouse.md)  |
| `floor_number`   | number                                     |
| `storage_number` | number                                     |
| `est_en_panne`   | boolean                                    |
| `purchase_price` | number                                     |
| `purchase_date`  | Date                                       |
| `category`       | string                                     |
| `maintenances`   | [Array&lt;Maintenance&gt;](Maintenance.md) |

## Example

```typescript
import type { Equipment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": eq_001,
  "name": Pelleteuse CAT 320,
  "description": Pelleteuse pour terrassement, 20 tonnes,
  "warehouse": null,
  "floor_number": 1,
  "storage_number": 5,
  "est_en_panne": false,
  "purchase_price": 150000.0,
  "purchase_date": Mon Jan 15 03:00:00 EAT 2024,
  "category": Engins de terrassement,
  "maintenances": null,
} satisfies Equipment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Equipment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
