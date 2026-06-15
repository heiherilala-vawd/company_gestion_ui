# CrupdateTravelEquipment

## Properties

| Name               | Type                                  |
| ------------------ | ------------------------------------- |
| `comment`          | string                                |
| `id`               | string                                |
| `travel_id`        | string                                |
| `equipment`        | string                                |
| `quantity`         | number                                |
| `status`           | [TransportStatus](TransportStatus.md) |
| `arrival_date`     | Date                                  |
| `arrival_location` | string                                |

## Example

```typescript
import type { CrupdateTravelEquipment } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": te_001,
  "travel_id": travel_001,
  "equipment": eq_001,
  "quantity": 1,
  "status": null,
  "arrival_date": 2024-02-20T18:00Z,
  "arrival_location": wh_001,
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
