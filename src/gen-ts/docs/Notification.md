
# Notification


## Properties

Name | Type
------------ | -------------
`comment` | string
`created_at` | Date
`updated_at` | Date
`created_by` | [AuditUser](AuditUser.md)
`updated_by` | [AuditUser](AuditUser.md)
`id` | string
`user` | [CrupdateUser](CrupdateUser.md)
`task_id` | string
`title` | string
`message` | string
`read` | boolean
`read_at` | Date
`completed` | boolean
`completed_at` | Date
`effective_completed` | boolean

## Example

```typescript
import type { Notification } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": notif_001,
  "user": null,
  "task_id": task_001,
  "title": Nouvelle tâche assignée,
  "message": Vous avez été assigné à la tâche 'Réparation moteur',
  "read": false,
  "read_at": null,
  "completed": false,
  "completed_at": null,
  "effective_completed": false,
} satisfies Notification

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Notification
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


