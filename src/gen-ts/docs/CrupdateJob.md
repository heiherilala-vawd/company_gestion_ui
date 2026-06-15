# CrupdateJob

## Properties

| Name                      | Type                      |
| ------------------------- | ------------------------- |
| `comment`                 | string                    |
| `id`                      | string                    |
| `company_id`              | string                    |
| `description`             | string                    |
| `contract_signature_date` | Date                      |
| `start_date`              | Date                      |
| `end_date`                | Date                      |
| `status`                  | [JobStatus](JobStatus.md) |

## Example

```typescript
import type { CrupdateJob } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": job_001,
  "company_id": comp_btp001,
  "description": Construction d'un entrepôt logistique de 5000m²,
  "contract_signature_date": Sat Jan 20 03:00:00 EAT 2024,
  "start_date": Thu Feb 01 03:00:00 EAT 2024,
  "end_date": Sat Aug 31 03:00:00 EAT 2024,
  "status": null,
} satisfies CrupdateJob

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateJob
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
