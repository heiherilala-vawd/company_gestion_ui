# CrupdateTask

## Properties

| Name                | Type                            |
| ------------------- | ------------------------------- |
| `id`                | string                          |
| `title`             | string                          |
| `description`       | string                          |
| `due_date`          | Date                            |
| `priority`          | [TaskPriority](TaskPriority.md) |
| `completed`         | boolean                         |
| `company_id`        | string                          |
| `assigned_user_ids` | Array&lt;string&gt;             |

## Example

```typescript
import type { CrupdateTask } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": task_001,
  "title": Vérifier le matériel de chantier,
  "description": Faire l'inventaire du matériel sur le chantier A,
  "due_date": Mon Jun 15 03:00:00 EAT 2026,
  "priority": null,
  "completed": false,
  "company_id": comp_btp001,
  "assigned_user_ids": ["usr_123456","usr_789012"],
} satisfies CrupdateTask

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateTask
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
