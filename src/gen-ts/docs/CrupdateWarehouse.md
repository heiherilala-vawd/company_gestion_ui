# CrupdateWarehouse

## Properties

| Name          | Type   |
| ------------- | ------ |
| `comment`     | string |
| `id`          | string |
| `name`        | string |
| `description` | string |
| `job_id`      | string |

## Example

```typescript
import type { CrupdateWarehouse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": wh_001,
  "name": Entrepôt Nord,
  "description": Entrepôt principal pour le chantier de Lyon,
  "job_id": job_001,
} satisfies CrupdateWarehouse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateWarehouse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
