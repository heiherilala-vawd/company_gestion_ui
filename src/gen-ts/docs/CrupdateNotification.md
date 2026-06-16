
# CrupdateNotification


## Properties

Name | Type
------------ | -------------
`comment` | string
`id` | string
`user_id` | string
`task_id` | string
`title` | string
`message` | string
`read` | boolean
`read_at` | Date
`completed` | boolean
`completed_at` | Date

## Example

```typescript
import type { CrupdateNotification } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": notif_001,
  "user_id": usr_123456,
  "task_id": task_001,
  "title": Nouvelle tâche assignée,
  "message": Vous avez été assigné à la tâche 'Réparation moteur',
  "read": false,
  "read_at": null,
  "completed": false,
  "completed_at": null,
} satisfies CrupdateNotification

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateNotification
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


