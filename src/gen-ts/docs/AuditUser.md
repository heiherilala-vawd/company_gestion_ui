
# AuditUser


## Properties

Name | Type
------------ | -------------
`id` | string
`role` | [Role](Role.md)
`first_name` | string
`last_name` | string
`sex` | [Sex](Sex.md)
`email` | string

## Example

```typescript
import type { AuditUser } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "id": usr_admin001,
  "role": null,
  "first_name": Admin,
  "last_name": System,
  "sex": null,
  "email": admin@company.com,
} satisfies AuditUser

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuditUser
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


