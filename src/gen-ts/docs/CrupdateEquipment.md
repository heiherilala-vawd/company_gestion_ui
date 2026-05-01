# CrupdateEquipment

## Properties

| Name             | Type   |
| ---------------- | ------ |
| `comment`        | string |
| `id`             | string |
| `name`           | string |
| `description`    | string |
| `warehouse_id`   | string |
| `floor_number`   | number |
| `storage_number` | number |

## Example

```typescript
import type { CrupdateEquipment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  id: null,
  name: null,
  description: null,
  warehouse_id: null,
  floor_number: null,
  storage_number: null,
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
