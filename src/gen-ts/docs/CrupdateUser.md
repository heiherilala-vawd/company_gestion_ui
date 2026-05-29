# CrupdateUser

## Properties

| Name            | Type            |
| --------------- | --------------- |
| `comment`       | string          |
| `id`            | string          |
| `role`          | [Role](Role.md) |
| `first_name`    | string          |
| `last_name`     | string          |
| `sex`           | [Sex](Sex.md)   |
| `email`         | string          |
| `password`      | string          |
| `company_id`    | string          |
| `birth_date`    | Date            |
| `manager_id`    | string          |
| `department_id` | string          |

## Example

```typescript
import type { CrupdateUser } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "id": usr_123456,
  "role": null,
  "first_name": Jean,
  "last_name": Dupont,
  "sex": null,
  "email": jean.dupont@example.com,
  "password": securePassword123,
  "company_id": comp_001,
  "birth_date": Tue May 15 03:00:00 EAT 1990,
  "manager_id": usr_admin001,
  "department_id": dept_001,
} satisfies CrupdateUser

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CrupdateUser
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
