# CrupdateTravelEquipment

## Properties

| Name        | Type                                  |
| ----------- | ------------------------------------- |
| `comment`   | string                                |
| `id`        | string                                |
| `travel_id` | string                                |
| `equipment` | string                                |
| `quantity`  | number                                |
| `status`    | [TransportStatus](TransportStatus.md) |

## Example

```typescript
import type { CrupdateTravelEquipment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  comment: null,
  id: null,
  travel_id: null,
  equipment: null,
  quantity: null,
  status: null,
} satisfies CrupdateTravelEquipment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateTravelEquipment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
