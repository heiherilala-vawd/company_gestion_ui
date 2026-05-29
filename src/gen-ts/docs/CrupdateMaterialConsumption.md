# CrupdateMaterialConsumption

## Properties

| Name                 | Type   |
| -------------------- | ------ |
| `comment`            | string |
| `id`                 | string |
| `material_id`        | string |
| `warehouse_id`       | string |
| `quantity`           | number |
| `consumption_date`   | Date   |
| `job_id`             | string |
| `reason`             | string |
| `consumption_status` | string |

## Example

```typescript
import type { CrupdateMaterialConsumption } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": mc_001,
  "material_id": mat_001,
  "warehouse_id": wh_001,
  "quantity": 50,
  "consumption_date": Sat Jun 15 03:00:00 EAT 2024,
  "job_id": job_001,
  "reason": Utilisation pour fondations,
  "consumption_status": COMPLETED,
} satisfies CrupdateMaterialConsumption

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateMaterialConsumption
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
