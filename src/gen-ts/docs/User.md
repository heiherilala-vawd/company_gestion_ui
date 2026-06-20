
# User


## Properties

Name | Type
------------ | -------------
`comment` | string
`created_at` | Date
`updated_at` | Date
`created_by` | [AuditUser](AuditUser.md)
`updated_by` | [AuditUser](AuditUser.md)
`id` | string
`role` | [Role](Role.md)
`first_name` | string
`last_name` | string
`sex` | [Sex](Sex.md)
`email` | string
`company` | [CrupdateCompany](CrupdateCompany.md)
`birth_date` | Date
`manager` | [CrupdateUser](CrupdateUser.md)
`department` | [CrupdateDepartment](CrupdateDepartment.md)

## Example

```typescript
import type { User } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "comment": Commentaire sur cette entité,
  "created_at": 2024-01-15T09:30Z,
  "updated_at": 2024-02-20T15:45Z,
  "created_by": null,
  "updated_by": null,
  "id": usr_123456,
  "role": null,
  "first_name": Jean,
  "last_name": Dupont,
  "sex": null,
  "email": jean.dupont@example.com,
  "company": null,
  "birth_date": Tue May 15 03:00:00 EAT 1990,
  "manager": null,
  "department": null,
} satisfies User

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as User
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


