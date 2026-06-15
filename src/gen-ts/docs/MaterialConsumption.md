# MaterialConsumption

## Properties

| Name                 | Type                      |
| -------------------- | ------------------------- |
| `comment`            | string                    |
| `created_at`         | Date                      |
| `updated_at`         | Date                      |
| `created_by`         | [AuditUser](AuditUser.md) |
| `updated_by`         | [AuditUser](AuditUser.md) |
| `id`                 | string                    |
| `material_id`        | string                    |
| `warehouse_id`       | string                    |
| `quantity`           | number                    |
| `consumption_date`   | Date                      |
| `job_id`             | string                    |
| `reason`             | string                    |
| `consumption_status` | string                    |

## Example

```typescript
import type { MaterialConsumption } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": mc_001,
  "material_id": mat_001,
  "warehouse_id": wh_001,
  "quantity": 50,
  "consumption_date": Sat Jun 15 03:00:00 EAT 2024,
  "job_id": job_001,
  "reason": Utilisation pour fondations,
  "consumption_status": COMPLETED,
} satisfies MaterialConsumption

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MaterialConsumption
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
