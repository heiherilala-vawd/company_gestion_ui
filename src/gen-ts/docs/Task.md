# Task

## Properties

| Name                | Type                            |
| ------------------- | ------------------------------- |
| `comment`           | string                          |
| `created_at`        | Date                            |
| `updated_at`        | Date                            |
| `created_by`        | [AuditUser](AuditUser.md)       |
| `updated_by`        | [AuditUser](AuditUser.md)       |
| `id`                | string                          |
| `title`             | string                          |
| `description`       | string                          |
| `due_date`          | Date                            |
| `priority`          | [TaskPriority](TaskPriority.md) |
| `company_id`        | string                          |
| `completed`         | boolean                         |
| `completed_at`      | Date                            |
| `assigned_user_ids` | Array&lt;string&gt;             |

## Example

```typescript
import type { Task } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": task_001,
  "title": Vérifier le matériel de chantier,
  "description": Faire l'inventaire du matériel sur le chantier A,
  "due_date": Mon Jun 15 03:00:00 EAT 2026,
  "priority": null,
  "company_id": comp_btp001,
  "completed": false,
  "completed_at": 2026-06-15T14:30Z,
  "assigned_user_ids": ["usr_123456","usr_789012"],
} satisfies Task

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Task
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
