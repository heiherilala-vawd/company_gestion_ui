# TaskScheduleApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateTaskSchedules**](TaskScheduleApi.md#crupdatetaskschedules) | **PUT** /users/{userId}/companies/{companyId}/task_schedules | Create or update task schedules |
| [**deleteTaskScheduleById**](TaskScheduleApi.md#deletetaskschedulebyid) | **DELETE** /users/{userId}/companies/{companyId}/task_schedules/{id} | Delete a task schedule by id |
| [**getTaskScheduleById**](TaskScheduleApi.md#gettaskschedulebyid) | **GET** /users/{userId}/companies/{companyId}/task_schedules/{id} | Get a task schedule by id |
| [**getTaskSchedules**](TaskScheduleApi.md#gettaskschedules) | **GET** /users/{userId}/companies/{companyId}/task_schedules | Get all task schedules |



## crupdateTaskSchedules

> Array&lt;TaskSchedule&gt; crupdateTaskSchedules(userId, companyId, crupdateTaskSchedule)

Create or update task schedules

### Example

```ts
import {
  Configuration,
  TaskScheduleApi,
} from 'api-client';
import type { CrupdateTaskSchedulesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TaskScheduleApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // Array<CrupdateTaskSchedule>
    crupdateTaskSchedule: ...,
  } satisfies CrupdateTaskSchedulesRequest;

  try {
    const data = await api.crupdateTaskSchedules(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |
| **crupdateTaskSchedule** | `Array<CrupdateTaskSchedule>` |  | |

### Return type

[**Array&lt;TaskSchedule&gt;**](TaskSchedule.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated task schedules |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteTaskScheduleById

> deleteTaskScheduleById(userId, companyId, id)

Delete a task schedule by id

### Example

```ts
import {
  Configuration,
  TaskScheduleApi,
} from 'api-client';
import type { DeleteTaskScheduleByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TaskScheduleApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: schedule_001,
  } satisfies DeleteTaskScheduleByIdRequest;

  try {
    const data = await api.deleteTaskScheduleById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Task schedule deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getTaskScheduleById

> TaskSchedule getTaskScheduleById(userId, companyId, id)

Get a task schedule by id

### Example

```ts
import {
  Configuration,
  TaskScheduleApi,
} from 'api-client';
import type { GetTaskScheduleByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TaskScheduleApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: schedule_001,
  } satisfies GetTaskScheduleByIdRequest;

  try {
    const data = await api.getTaskScheduleById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**TaskSchedule**](TaskSchedule.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The task schedule |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getTaskSchedules

> Array&lt;TaskSchedule&gt; getTaskSchedules(userId, companyId)

Get all task schedules

### Example

```ts
import {
  Configuration,
  TaskScheduleApi,
} from 'api-client';
import type { GetTaskSchedulesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TaskScheduleApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
  } satisfies GetTaskSchedulesRequest;

  try {
    const data = await api.getTaskSchedules(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;TaskSchedule&gt;**](TaskSchedule.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of task schedules |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

