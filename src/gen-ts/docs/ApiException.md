
# ApiException


## Properties

Name | Type
------------ | -------------
`type` | string
`message` | string

## Example

```typescript
import type { ApiException } from 'api-client'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "message": null,
} satisfies ApiException

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiException
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


