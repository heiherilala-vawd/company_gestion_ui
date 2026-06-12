# HRApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                    | HTTP request                                                        | Description                                       |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| [**crupdateEmployeeLeaveConfigs**](HRApi.md#crupdateemployeeleaveconfigs) | **PUT** /companies/{comp_id}/leave_configs                          | Create or update employee leave configs           |
| [**crupdateLeaveTypes**](HRApi.md#crupdateleavetypes)                     | **PUT** /companies/{comp_id}/leave_types                            | Create or update leave types                      |
| [**crupdateLeaves**](HRApi.md#crupdateleaves)                             | **PUT** /companies/{comp_id}/leaves                                 | Create or update leaves                           |
| [**deleteLeaveById**](HRApi.md#deleteleavebyid)                           | **DELETE** /companies/{comp_id}/leaves/{id}                         | Delete leave by identifier                        |
| [**getEmployeeLeaveConfigById**](HRApi.md#getemployeeleaveconfigbyid)     | **GET** /companies/{comp_id}/leave_configs/{id}                     | Get a leave config by id                          |
| [**getEmployeeLeaveConfigs**](HRApi.md#getemployeeleaveconfigs)           | **GET** /companies/{comp_id}/leave_configs                          | Get all employee leave configs                    |
| [**getEmployeesWithoutLeave**](HRApi.md#getemployeeswithoutleave)         | **GET** /companies/{comp_id}/leave_balances/employees_without_leave | Get employees who haven\&#39;t taken any leave    |
| [**getLeaveBalances**](HRApi.md#getleavebalances)                         | **GET** /companies/{comp_id}/leave_balances                         | Get leave balances for all employees in a company |
| [**getLeaveById**](HRApi.md#getleavebyid)                                 | **GET** /companies/{comp_id}/leaves/{id}                            | Get leave by identifier                           |
| [**getLeaveTypeById**](HRApi.md#getleavetypebyid)                         | **GET** /companies/{comp_id}/leave_types/{id}                       | Get a leave type by id                            |
| [**getLeaveTypes**](HRApi.md#getleavetypes)                               | **GET** /companies/{comp_id}/leave_types                            | Get all leave types                               |
| [**getLeaves**](HRApi.md#getleaves)                                       | **GET** /companies/{comp_id}/leaves                                 | Get all leaves                                    |

## crupdateEmployeeLeaveConfigs

> Array&lt;EmployeeLeaveConfig&gt; crupdateEmployeeLeaveConfigs(compId, crupdateEmployeeLeaveConfig)

Create or update employee leave configs

### Example

```ts
import {
  Configuration,
  HRApi,
} from 'api-client';
import type { CrupdateEmployeeLeaveConfigsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new HRApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateEmployeeLeaveConfig>
    crupdateEmployeeLeaveConfig: ...,
  } satisfies CrupdateEmployeeLeaveConfigsRequest;

  try {
    const data = await api.crupdateEmployeeLeaveConfigs(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                            | Type                                 | Description | Notes                     |
| ------------------------------- | ------------------------------------ | ----------- | ------------------------- |
| **compId**                      | `string`                             |             | [Defaults to `undefined`] |
| **crupdateEmployeeLeaveConfig** | `Array<CrupdateEmployeeLeaveConfig>` |             |                           |

### Return type

[**Array&lt;EmployeeLeaveConfig&gt;**](EmployeeLeaveConfig.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **200**     | The created or updated configs | -                |
| **400**     | Bad request                    | -                |
| **403**     | Forbidden                      | -                |
| **404**     | Not found                      | -                |
| **429**     | Too many requests to the API   | -                |
| **500**     | Internal server error          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## crupdateLeaveTypes

> Array&lt;LeaveType&gt; crupdateLeaveTypes(compId, crupdateLeaveType)

Create or update leave types

### Example

```ts
import {
  Configuration,
  HRApi,
} from 'api-client';
import type { CrupdateLeaveTypesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new HRApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateLeaveType>
    crupdateLeaveType: ...,
  } satisfies CrupdateLeaveTypesRequest;

  try {
    const data = await api.crupdateLeaveTypes(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                  | Type                       | Description | Notes                     |
| --------------------- | -------------------------- | ----------- | ------------------------- |
| **compId**            | `string`                   |             | [Defaults to `undefined`] |
| **crupdateLeaveType** | `Array<CrupdateLeaveType>` |             |                           |

### Return type

[**Array&lt;LeaveType&gt;**](LeaveType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **200**     | The created or updated leave types | -                |
| **400**     | Bad request                        | -                |
| **403**     | Forbidden                          | -                |
| **404**     | Not found                          | -                |
| **429**     | Too many requests to the API       | -                |
| **500**     | Internal server error              | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## crupdateLeaves

> Array&lt;Leave&gt; crupdateLeaves(compId, crupdateLeave)

Create or update leaves

### Example

```ts
import {
  Configuration,
  HRApi,
} from 'api-client';
import type { CrupdateLeavesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new HRApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateLeave>
    crupdateLeave: ...,
  } satisfies CrupdateLeavesRequest;

  try {
    const data = await api.crupdateLeaves(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type                   | Description | Notes                     |
| ----------------- | ---------------------- | ----------- | ------------------------- |
| **compId**        | `string`               |             | [Defaults to `undefined`] |
| **crupdateLeave** | `Array<CrupdateLeave>` |             |                           |

### Return type

[**Array&lt;Leave&gt;**](Leave.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | The created or updated leaves | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteLeaveById

> deleteLeaveById(compId, id)

Delete leave by identifier

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { DeleteLeaveByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: leave_1,
  } satisfies DeleteLeaveByIdRequest

  try {
    const data = await api.deleteLeaveById(body)
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
| **204**     | Leave deleted successfully   | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEmployeeLeaveConfigById

> EmployeeLeaveConfig getEmployeeLeaveConfigById(compId, id)

Get a leave config by id

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetEmployeeLeaveConfigByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: config_1,
  } satisfies GetEmployeeLeaveConfigByIdRequest

  try {
    const data = await api.getEmployeeLeaveConfigById(body)
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

[**EmployeeLeaveConfig**](EmployeeLeaveConfig.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The employee leave config    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEmployeeLeaveConfigs

> Array&lt;EmployeeLeaveConfig&gt; getEmployeeLeaveConfigs(compId)

Get all employee leave configs

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetEmployeeLeaveConfigsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
  } satisfies GetEmployeeLeaveConfigsRequest

  try {
    const data = await api.getEmployeeLeaveConfigs(body)
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

### Return type

[**Array&lt;EmployeeLeaveConfig&gt;**](EmployeeLeaveConfig.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **200**     | List of employee leave configs | -                |
| **400**     | Bad request                    | -                |
| **403**     | Forbidden                      | -                |
| **404**     | Not found                      | -                |
| **429**     | Too many requests to the API   | -                |
| **500**     | Internal server error          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEmployeesWithoutLeave

> Array&lt;CrupdateUser&gt; getEmployeesWithoutLeave(compId, year)

Get employees who haven\&#39;t taken any leave

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetEmployeesWithoutLeaveRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number
    year: 2026,
  } satisfies GetEmployeesWithoutLeaveRequest

  try {
    const data = await api.getEmployeesWithoutLeave(body)
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
| **year**   | `number` |             | [Defaults to `undefined`] |

### Return type

[**Array&lt;CrupdateUser&gt;**](CrupdateUser.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                       | Response headers |
| ----------- | --------------------------------- | ---------------- |
| **200**     | List of users with no leave taken | -                |
| **400**     | Bad request                       | -                |
| **403**     | Forbidden                         | -                |
| **404**     | Not found                         | -                |
| **429**     | Too many requests to the API      | -                |
| **500**     | Internal server error             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLeaveBalances

> Array&lt;LeaveBalance&gt; getLeaveBalances(compId, year)

Get leave balances for all employees in a company

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetLeaveBalancesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number
    year: 2026,
  } satisfies GetLeaveBalancesRequest

  try {
    const data = await api.getLeaveBalances(body)
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
| **year**   | `number` |             | [Defaults to `undefined`] |

### Return type

[**Array&lt;LeaveBalance&gt;**](LeaveBalance.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of leave balances       | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLeaveById

> Leave getLeaveById(compId, id)

Get leave by identifier

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetLeaveByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: leave_1,
  } satisfies GetLeaveByIdRequest

  try {
    const data = await api.getLeaveById(body)
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

[**Leave**](Leave.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified leave         | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLeaveTypeById

> LeaveType getLeaveTypeById(compId, id)

Get a leave type by id

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetLeaveTypeByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: leave_type_1,
  } satisfies GetLeaveTypeByIdRequest

  try {
    const data = await api.getLeaveTypeById(body)
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

[**LeaveType**](LeaveType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The leave type               | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLeaveTypes

> Array&lt;LeaveType&gt; getLeaveTypes(compId)

Get all leave types

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetLeaveTypesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
  } satisfies GetLeaveTypesRequest

  try {
    const data = await api.getLeaveTypes(body)
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

### Return type

[**Array&lt;LeaveType&gt;**](LeaveType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of leave types          | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLeaves

> Array&lt;Leave&gt; getLeaves(compId, userId, leaveTypeId, status, year, page, pageSize)

Get all leaves

### Example

```ts
import { Configuration, HRApi } from 'api-client'
import type { GetLeavesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new HRApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string (optional)
    userId: usr_123456,
    // string (optional)
    leaveTypeId: leave_type_1,
    // string (optional)
    status: APPROVED,
    // number (optional)
    year: 2026,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetLeavesRequest

  try {
    const data = await api.getLeaves(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                |
| --------------- | -------- | ----------- | ------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]            |
| **userId**      | `string` |             | [Optional] [Defaults to `undefined`] |
| **leaveTypeId** | `string` |             | [Optional] [Defaults to `undefined`] |
| **status**      | `string` |             | [Optional] [Defaults to `undefined`] |
| **year**        | `number` |             | [Optional] [Defaults to `undefined`] |
| **page**        | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Leave&gt;**](Leave.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of leaves               | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
