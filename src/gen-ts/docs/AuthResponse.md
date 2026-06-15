# AuthResponse

## Properties

| Name          | Type                |
| ------------- | ------------------- |
| `token`       | string              |
| `type`        | string              |
| `id`          | string              |
| `email`       | string              |
| `role`        | string              |
| `company_ids` | Array&lt;string&gt; |

## Example

```typescript
import type { AuthResponse } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMTIzNDU2IiwibmFtZSI6IkplYW4gRHVwb250IiwiaWF0IjoxNTE2MjM5MDIyfQ,
  "type": Bearer,
  "id": usr_123456,
  "email": jean.dupont@example.com,
  "role": EMPLOYEE,
  "company_ids": ["comp_btp001","comp_btp002"],
} satisfies AuthResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
