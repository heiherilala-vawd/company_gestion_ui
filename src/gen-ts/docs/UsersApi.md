# UsersApi

All URIs are relative to *https://api-dev.company.com*

| Method                                           | HTTP request                               | Description                               |
| ------------------------------------------------ | ------------------------------------------ | ----------------------------------------- |
| [**crupdateUsers**](UsersApi.md#crupdateusers)   | **PUT** /companies/{comp_id}/users         | Create new users or update existing users |
| [**deleteUserById**](UsersApi.md#deleteuserbyid) | **DELETE** /companies/{comp_id}/users/{id} | Delete a user by identifier               |
| [**getUserById**](UsersApi.md#getuserbyid)       | **GET** /companies/{comp_id}/users/{id}    | Get user by identifier                    |
| [**getUsers**](UsersApi.md#getusers)             | **GET** /companies/{comp_id}/users         | Get all users                             |

## crupdateUsers

> Array&lt;User&gt; crupdateUsers(compId, crupdateUser)

Create new users or update existing users

Update users when &#x60;id&#x60; are provided, create them otherwise.

### Example

```ts
import { Configuration, UsersApi } from 'api-client'
import type { CrupdateUsersRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new UsersApi(config)

  const body = {
    // string
    compId: comp_001,
    // Array<CrupdateUser>
    crupdateUser: [
      {
        id: 'usr_123456',
        first_name: 'Jean',
        last_name: 'Dupont',
        email: 'jean.dupont@example.com',
        role: 'EMPLOYEE',
        sex: 'M',
        password: 'newPassword123',
        comment: 'Mise à jour du profil',
      },
      {
        first_name: 'Pierre',
        last_name: 'Durand',
        email: 'pierre.durand@example.com',
        role: 'WAREHOUSE_WORKER',
        sex: 'M',
        password: 'password123',
        comment: "Nouvel employé d'entrepôt",
      },
    ],
  } satisfies CrupdateUsersRequest

  try {
    const data = await api.crupdateUsers(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name             | Type                  | Description | Notes                     |
| ---------------- | --------------------- | ----------- | ------------------------- |
| **compId**       | `string`              |             | [Defaults to `undefined`] |
| **crupdateUser** | `Array<CrupdateUser>` |             |                           |

### Return type

[**Array&lt;User&gt;**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The created or updated users | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteUserById

> deleteUserById(compId, id)

Delete a user by identifier

### Example

```ts
import { Configuration, UsersApi } from 'api-client'
import type { DeleteUserByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new UsersApi(config)

  const body = {
    // string
    compId: comp_001,
    // string
    id: usr_123456,
  } satisfies DeleteUserByIdRequest

  try {
    const data = await api.deleteUserById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **204**     | User deleted successfully    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getUserById

> User getUserById(compId, id)

Get user by identifier

### Example

```ts
import { Configuration, UsersApi } from 'api-client'
import type { GetUserByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new UsersApi(config)

  const body = {
    // string
    compId: comp_001,
    // string
    id: usr_123456,
  } satisfies GetUserByIdRequest

  try {
    const data = await api.getUserById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

[**User**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified user          | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getUsers

> Array&lt;User&gt; getUsers(compId, page, pageSize, firstName, lastName, email, role)

Get all users

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'api-client';
import type { GetUsersRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // string
    compId: comp_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter users by first name, case is ignored (optional)
    firstName: Jean,
    // string | Filter users by last name, case is ignored (optional)
    lastName: Dupont,
    // string | Filter users by email, case is ignored (optional)
    email: jean.dupont@example.com,
    // Role | Filter users by role (optional)
    role: EMPLOYEE,
  } satisfies GetUsersRequest;

  try {
    const data = await api.getUsers(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type     | Description                                 | Notes                                                                                          |
| ------------- | -------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **compId**    | `string` |                                             | [Defaults to `undefined`]                                                                      |
| **page**      | `number` |                                             | [Optional] [Defaults to `undefined`]                                                           |
| **pageSize**  | `number` |                                             | [Optional] [Defaults to `undefined`]                                                           |
| **firstName** | `string` | Filter users by first name, case is ignored | [Optional] [Defaults to `undefined`]                                                           |
| **lastName**  | `string` | Filter users by last name, case is ignored  | [Optional] [Defaults to `undefined`]                                                           |
| **email**     | `string` | Filter users by email, case is ignored      | [Optional] [Defaults to `undefined`]                                                           |
| **role**      | `Role`   | Filter users by role                        | [Optional] [Defaults to `undefined`] [Enum: ADMIN, WAREHOUSE_WORKER, EMPLOYEE, ADMINISTRATION] |

### Return type

[**Array&lt;User&gt;**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of users                | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
