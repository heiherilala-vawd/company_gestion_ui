# DepartmentApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                            | HTTP request                                     | Description                                    |
| ----------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| [**crupdateDepartments**](DepartmentApi.md#crupdatedepartments)   | **PUT** /companies/{comp_id}/departments         | Create new departments or update existing ones |
| [**deleteDepartmentById**](DepartmentApi.md#deletedepartmentbyid) | **DELETE** /companies/{comp_id}/departments/{id} | Delete a department by identifier              |
| [**getDepartmentById**](DepartmentApi.md#getdepartmentbyid)       | **GET** /companies/{comp_id}/departments/{id}    | Get a department by identifier                 |
| [**getDepartments**](DepartmentApi.md#getdepartments)             | **GET** /companies/{comp_id}/departments         | Get all departments                            |

## crupdateDepartments

> Array&lt;Department&gt; crupdateDepartments(compId, crupdateDepartment)

Create new departments or update existing ones

### Example

```ts
import {
  Configuration,
  DepartmentApi,
} from 'api-client';
import type { CrupdateDepartmentsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DepartmentApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateDepartment>
    crupdateDepartment: ...,
  } satisfies CrupdateDepartmentsRequest;

  try {
    const data = await api.crupdateDepartments(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                   | Type                        | Description | Notes                     |
| ---------------------- | --------------------------- | ----------- | ------------------------- |
| **compId**             | `string`                    |             | [Defaults to `undefined`] |
| **crupdateDepartment** | `Array<CrupdateDepartment>` |             |                           |

### Return type

[**Array&lt;Department&gt;**](Department.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **200**     | The created or updated departments | -                |
| **400**     | Bad request                        | -                |
| **403**     | Forbidden                          | -                |
| **404**     | Not found                          | -                |
| **429**     | Too many requests to the API       | -                |
| **500**     | Internal server error              | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteDepartmentById

> deleteDepartmentById(compId, id)

Delete a department by identifier

### Example

```ts
import { Configuration, DepartmentApi } from 'api-client'
import type { DeleteDepartmentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new DepartmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: dept_001,
  } satisfies DeleteDepartmentByIdRequest

  try {
    const data = await api.deleteDepartmentById(body)
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
| **204**     | Department deleted           | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getDepartmentById

> Department getDepartmentById(compId, id)

Get a department by identifier

### Example

```ts
import { Configuration, DepartmentApi } from 'api-client'
import type { GetDepartmentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new DepartmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: dept_001,
  } satisfies GetDepartmentByIdRequest

  try {
    const data = await api.getDepartmentById(body)
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

[**Department**](Department.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The department               | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getDepartments

> Array&lt;Department&gt; getDepartments(compId, page, pageSize)

Get all departments

### Example

```ts
import { Configuration, DepartmentApi } from 'api-client'
import type { GetDepartmentsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new DepartmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetDepartmentsRequest

  try {
    const data = await api.getDepartments(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **page**     | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Department&gt;**](Department.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of departments          | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
