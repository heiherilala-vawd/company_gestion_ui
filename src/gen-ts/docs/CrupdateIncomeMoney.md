# CrupdateIncomeMoney

## Properties

| Name                  | Type   |
| --------------------- | ------ |
| `comment`             | string |
| `amount`              | number |
| `description`         | string |
| `id`                  | string |
| `source_organization` | string |
| `invoice_reference`   | string |
| `job_id`              | string |

## Example

```typescript
import type { CrupdateIncomeMoney } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "amount": 15000,
  "description": Achat de matériaux pour le chantier,
  "id": inc_001,
  "source_organization": Client Principal,
  "invoice_reference": FACT-2024-001,
  "job_id": job_001,
} satisfies CrupdateIncomeMoney

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateIncomeMoney
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
