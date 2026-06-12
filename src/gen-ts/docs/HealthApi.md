# HealthApi

All URIs are relative to *https://api-dev.company.com*

| Method                        | HTTP request  | Description           |
| ----------------------------- | ------------- | --------------------- |
| [**ping**](HealthApi.md#ping) | **GET** /ping | Health check endpoint |

## ping

> string ping()

Health check endpoint

### Example

```ts
import { Configuration, HealthApi } from 'api-client'
import type { PingRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HealthApi(config)

  try {
    const data = await api.ping()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

This endpoint does not need any parameter.

### Return type

**string**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`

### HTTP response details

| Status code | Description     | Response headers |
| ----------- | --------------- | ---------------- |
| **200**     | Health check ok | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
