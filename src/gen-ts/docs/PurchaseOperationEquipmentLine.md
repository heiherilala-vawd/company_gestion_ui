# PurchaseOperationEquipmentLine

## Properties

| Name                  | Type                                      |
| --------------------- | ----------------------------------------- |
| `equipment`           | [CrupdateEquipment](CrupdateEquipment.md) |
| `expense_id`          | string                                    |
| `purchase_id`         | string                                    |
| `travel_equipment_id` | string                                    |
| `unit_price`          | number                                    |

## Example

```typescript
import type { PurchaseOperationEquipmentLine } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  equipment: null,
  expense_id: exp_001,
  purchase_id: purch_003,
  travel_equipment_id: travel_eq_001,
  unit_price: 1200,
} satisfies PurchaseOperationEquipmentLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PurchaseOperationEquipmentLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
