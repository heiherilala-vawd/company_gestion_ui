# TaskApi

All URIs are relative to *https://api-dev.company.com*

| Method                                          | HTTP request                               | Description                 |
| ----------------------------------------------- | ------------------------------------------ | --------------------------- |
| [**crupdateTasks**](TaskApi.md#crupdatetasks)   | **PUT** /companies/{comp_id}/tasks         | Create or update tasks      |
| [**deleteTaskById**](TaskApi.md#deletetaskbyid) | **DELETE** /companies/{comp_id}/tasks/{id} | Delete a task by id         |
| [**getTaskById**](TaskApi.md#gettaskbyid)       | **GET** /companies/{comp_id}/tasks/{id}    | Get a task by id            |
| [**getTasks**](TaskApi.md#gettasks)             | **GET** /companies/{comp_id}/tasks         | Get all tasks for a company |

## crupdateTasks

> Array&lt;Task&gt; crupdateTasks(compId, crupdateTask)

Create or update tasks

### Example

```ts
import {
  Configuration,
  TaskApi,
} from 'api-client';
import type { CrupdateTasksRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TaskApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateTask>
    crupdateTask: ...,
  } satisfies CrupdateTasksRequest;

  try {
    const data = await api.crupdateTasks(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name             | Type                  | Description | Notes                     |
| ---------------- | --------------------- | ----------- | ------------------------- |
| **compId**       | `string`              |             | [Defaults to `undefined`] |
| **crupdateTask** | `Array<CrupdateTask>` |             |                           |

### Return type

[**Array&lt;Task&gt;**](Task.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The created or updated tasks | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteTaskById

> deleteTaskById(compId, id)

Delete a task by id

### Example

```ts
import { Configuration, TaskApi } from 'api-client'
import type { DeleteTaskByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TaskApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: task_001,
  } satisfies DeleteTaskByIdRequest

  try {
    const data = await api.deleteTaskById(body)
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
| **204**     | Task deleted successfully    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTaskById

> Task getTaskById(compId, id)

Get a task by id

### Example

```ts
import { Configuration, TaskApi } from 'api-client'
import type { GetTaskByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TaskApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: task_001,
  } satisfies GetTaskByIdRequest

  try {
    const data = await api.getTaskById(body)
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

[**Task**](Task.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The task                     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTasks

> Array&lt;Task&gt; getTasks(compId)

Get all tasks for a company

### Example

```ts
import { Configuration, TaskApi } from 'api-client'
import type { GetTasksRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TaskApi(config)

  const body = {
    // string
    compId: comp_btp001,
  } satisfies GetTasksRequest

  try {
    const data = await api.getTasks(body)
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

[**Array&lt;Task&gt;**](Task.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of tasks                | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
