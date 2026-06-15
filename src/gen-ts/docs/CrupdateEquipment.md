# CrupdateEquipment

## Properties

| Name             | Type    |
| ---------------- | ------- |
| `comment`        | string  |
| `id`             | string  |
| `name`           | string  |
| `description`    | string  |
| `warehouse_id`   | string  |
| `floor_number`   | number  |
| `storage_number` | number  |
| `est_en_panne`   | boolean |
| `purchase_price` | number  |
| `purchase_date`  | Date    |
| `category`       | string  |

## Example

```typescript
import type { CrupdateEquipment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": eq_001,
  "name": Pelleteuse CAT 320,
  "description": Pelleteuse pour terrassement, 20 tonnes,
  "warehouse_id": wh_001,
  "floor_number": 1,
  "storage_number": 5,
  "est_en_panne": false,
  "purchase_price": 150000.0,
  "purchase_date": Mon Jan 15 03:00:00 EAT 2024,
  "category": Engins de terrassement,
} satisfies CrupdateEquipment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateEquipment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
