# AuthApi

All URIs are relative to *https://api-dev.company.com*

| Method                                              | HTTP request            | Description         |
| --------------------------------------------------- | ----------------------- | ------------------- |
| [**authLoginPost**](AuthApi.md#authloginpost)       | **POST** /auth/login    | Login user          |
| [**authRegisterPost**](AuthApi.md#authregisterpost) | **POST** /auth/register | Register a new user |
| [**authWhoamiGet**](AuthApi.md#authwhoamiget)       | **GET** /auth/whoami    | Get current user    |

## authLoginPost

> AuthResponse authLoginPost(loginRequest)

Login user

### Example

```ts
import { Configuration, AuthApi } from 'api-client'
import type { AuthLoginPostRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new AuthApi(config)

  const body = {
    // LoginRequest
    loginRequest: { email: 'jean.dupont@example.com', password: 'securePassword123' },
  } satisfies AuthLoginPostRequest

  try {
    const data = await api.authLoginPost(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name             | Type                            | Description | Notes |
| ---------------- | ------------------------------- | ----------- | ----- |
| **loginRequest** | [LoginRequest](LoginRequest.md) |             |       |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Login success                | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## authRegisterPost

> AuthResponse authRegisterPost(crupdateUser)

Register a new user

### Example

```ts
import { Configuration, AuthApi } from 'api-client'
import type { AuthRegisterPostRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new AuthApi(config)

  const body = {
    // CrupdateUser
    crupdateUser: {
      first_name: 'Jean',
      last_name: 'Dupont',
      email: 'jean.dupont@example.com',
      password: 'securePassword123',
      role: 'EMPLOYEE',
      sex: 'M',
      comment: 'Nouvel employé en CDI',
    },
  } satisfies AuthRegisterPostRequest

  try {
    const data = await api.authRegisterPost(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name             | Type                            | Description | Notes |
| ---------------- | ------------------------------- | ----------- | ----- |
| **crupdateUser** | [CrupdateUser](CrupdateUser.md) |             |       |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | User registered              | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## authWhoamiGet

> AuthResponse authWhoamiGet()

Get current user

### Example

```ts
import { Configuration, AuthApi } from 'api-client'
import type { AuthWhoamiGetRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new AuthApi(config)

  try {
    const data = await api.authWhoamiGet()
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

[**AuthResponse**](AuthResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Current user info            | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
