# CrupdateTeam

## Properties

| Name         | Type                |
| ------------ | ------------------- |
| `comment`    | string              |
| `id`         | string              |
| `name`       | string              |
| `leader_id`  | string              |
| `member_ids` | Array&lt;string&gt; |

## Example

```typescript
import type { CrupdateTeam } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": team_001,
  "name": Équipe chantier A,
  "leader_id": usr_123456,
  "member_ids": ["usr_123456","usr_789012"],
} satisfies CrupdateTeam

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateTeam
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
